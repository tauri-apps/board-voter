<template>
  <v-container style="max-width: 21cm">
    <v-row>
      <v-col align="center" class="header">
        <h1>Tauri Board Election 2025</h1>
        <p>
          This year we invite <b>Tauri Working Group members</b> to cast their
          vote. This page provides the voting tool. For general information
          about this election see
          <a
            href="https://github.com/tauri-apps/governance-and-guidance/tree/main/board-election-2025"
            >the GitHub documentation</a
          >
        </p>
        <!-- <p>
          <b>Voting ended after July 14th, 2025.</b>
          Please refer to the GitHub repository for results.
        </p> -->
        <v-btn
          color="success"
          width="5cm"
          height="1.25cm"
          class="vote"
          :disabled="candidatesList.length > 0"
          :href="
            mailto +
            '?subject=' +
            encodeURIComponent(mailtoSubject) +
            '&body=' +
            encodeURIComponent(as_body())
          "
          >Vote</v-btn
        >
        <p>
          <span class="hint" v-if="candidatesList.length > 0"
            >Please drag each of the candidates into the Yes or No
            section.</span
          >
          <a href="#" v-if="candidatesList.length == 0" @click="clickFallback"
            >Button not working?</a
          >
        </p>
        <div v-show="showFallback" class="fallback">
          <p>You can also email the following manually:</p>
          <b>To:</b> <code>board@tauri.app</code><br />
          <b>Subject:</b> <code>{{ mailtoSubject }}</code
          ><br />
          <code
            class="body"
            v-html="as_body().replaceAll('\n', '<br>\n')"
          ></code
          ><br />
        </div>
        <p>
          For each of the following candidates, are you in favor of them
          becoming a Tauri Board Director?
        </p>
      </v-col>
    </v-row>

    <v-row>
      <draggable
        :list="yesList"
        group="people"
        itemKey="name"
        class="draggable-container"
        v-bind="dragOptions"
      >
        <template #header>
          <h2 class="text-center">Yes</h2>
          <p class="text-center">
            You think these candidates <b><i>would</i></b> be suitable as
            Directors.<br />In no particular order. (<a
              href="https://github.com/tauri-apps/governance-and-guidance/tree/main/board-election-2025#what-about-order-of-preference"
              title="What about order of preference?"
              >Why?</a
            >)
          </p>
        </template>
        <template #item="{ element, index }">
          <v-card class="person-card">
            <v-row align="center">
              <v-col cols="1"> &nbsp; </v-col>
              <v-col cols="2" class="right">
                <v-avatar class="ma-3" size="75" rounded="1">
                  <v-img :src="avatarIdToGitHubLink(element.avatar)"></v-img>
                </v-avatar>
              </v-col>
              <v-col justify="center">
                <v-card-title style="margin-left: 0.5cm">{{
                  element.name
                }}</v-card-title>
              </v-col>
              <v-col class="right">
                <v-btn
                  color="info"
                  height="100"
                  variant="tonal"
                  :href="element.intro_url"
                  target="_blank"
                  >Readme</v-btn
                >
              </v-col>
            </v-row>
          </v-card>
        </template>
      </draggable>

      <draggable
        v-if="candidatesList.length > 0"
        :list="candidatesList"
        group="people"
        itemKey="name"
        class="draggable-container"
        v-bind="dragOptions"
      >
        <template #header>
          <h2 class="text-center">Candidates</h2>
          <p class="text-center">
            Please drag each of these candidates into the Yes or No section.
          </p>
        </template>
        <template #item="{ element, index }">
          <v-card class="person-card">
            <v-row align="center">
              <v-col cols="3" class="right">
                <v-avatar class="ma-3" size="75" rounded="1">
                  <v-img :src="avatarIdToGitHubLink(element.avatar)"></v-img>
                </v-avatar>
              </v-col>
              <v-col justify="center">
                <v-card-title style="margin-left: 0.5cm">{{
                  element.name
                }}</v-card-title>
              </v-col>
              <v-col class="right">
                <v-btn
                  color="info"
                  height="100"
                  variant="tonal"
                  :href="element.intro_url"
                  target="_blank"
                  >Readme</v-btn
                >
              </v-col>
            </v-row>
          </v-card>
        </template>
      </draggable>

      <draggable
        :list="noList"
        group="people"
        itemKey="name"
        class="draggable-container"
        v-bind="dragOptions"
      >
        <template #header>
          <h2 class="text-center">No</h2>
          <p class="text-center">
            You think these candidates <b><i>wouldn't</i></b> be suitable as
            Directors.
          </p>
        </template>
        <template #item="{ element, index }">
          <v-card class="person-card">
            <v-row align="center">
              <v-col cols="3" class="right">
                <v-avatar class="ma-3" size="75" rounded="1">
                  <v-img :src="avatarIdToGitHubLink(element.avatar)"></v-img>
                </v-avatar>
              </v-col>
              <v-col justify="center">
                <v-card-title style="margin-left: 0.5cm">{{
                  element.name
                }}</v-card-title>
              </v-col>
              <v-col class="right">
                <v-btn
                  color="info"
                  height="100"
                  variant="tonal"
                  :href="element.intro_url"
                  target="_blank"
                  >Readme</v-btn
                >
              </v-col>
            </v-row>
          </v-card>
        </template>
      </draggable>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { type Candidate, CANDIDATES } from "../system/candidates";
import { type Vote, new_vote_id } from "../system/vote";

function shuffle(array: Candidate[]): Candidate[] {
  let currentIndex = array.length,
    randomIndex: number;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export default {
  data() {
    return {
      mailto: "mailto:board@tauri.app",
      mailtoSubject: "Vote for Tauri Board Election 2025",
      yesList: <Candidate[]>[],
      noList: <Candidate[]>[],
      candidatesList: shuffle(CANDIDATES),
      showFallback: false,
    };
  },
  methods: {
    avatarIdToGitHubLink(id: number) {
      return `https://avatars.githubusercontent.com/u/${id}?v=4`;
    },
    as_vote(): Vote {
      return {
        yes: this.yesList.map((c) => c.id),
        no: this.noList.map((c) => c.id),
        random_id: new_vote_id(),
      };
    },
    as_body(): string {
      return `Thank you for voting!
        Here is a summary of your vote.
        Make sure you send the email.
        -- Voted Yes --
        ${this.yesList.map((c) => c.name).join("\n")}
        -- Voted No --
        ${this.noList.map((c) => c.name).join("\n")}
        -- JSON vote --
        ${JSON.stringify(this.as_vote())}`;
    },
    clickFallback(e: Event): boolean {
      e.preventDefault();
      // Once opened, keep it open. But only open when you've decided on all candidates.
      this.showFallback = this.showFallback || this.candidatesList.length == 0;
      return true;
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
      };
    },
  },
};
</script>

<style>
.header p {
  margin-top: 0.5cm;
  margin-bottom: 0.5cm;
}

.person-card {
  cursor: move;
  margin-top: 16px;
  flex-grow: 1;
  transition: transform 0.5s;
}

.draggable-container {
  border: 1px solid #333;
  width: 100%;
  border-radius: 16px;
  margin-top: 0.5cm;
  padding: 0.5cm;
  display: flex;
  flex-direction: column;
}

.right {
  text-align: right;
}

.fallback {
  text-align: left;
  width: 75%;
}

.fallback code {
  user-select: all;
}

code.body {
  display: block;
  border: 1px solid #333;
  padding: 0.5cm;
}

.hint {
  font-style: italic;
  color: #333;
}
</style>
