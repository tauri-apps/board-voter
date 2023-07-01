<template>
  <v-container style="max-width: 21cm">
    <v-row>
      <v-col align="center">
        <v-btn
          color="success"
          width="5cm"
          height="1.25cm"
          :disabled="candidatesList.length > 0"
          :href="
            mailto +
            '?subject=' +
            mailtoSubject +
            '&body=' +
            mailtoBody +
            '%0D%0A%0D%0AVoted Yes%0D%0A' +
            yesList.map((val) => val.name).join('%0D%0A') +
            '%0D%0A%0D%0AVoted No%0D%0A' +
            noList.map((val) => val.name).join('%0D%0A')
          "
          >Submit</v-btn
        >
      </v-col>
    </v-row>

    <v-row>
      <draggable
        :list="yesList"
        group="people"
        itemKey="name"
        class="draggable-container"
      >
        <template #header>
          <h1 class="text-center">Yes</h1>
          <p class="text-center">
            You think these candidates <i>would</i> be suitable as Directors<br />Ordered
            of which you prefer most to least
          </p>
        </template>
        <template #item="{ element, index }">
          <v-card class="person-card">
            <v-row align="center">
              <v-col cols="1">
                <span
                  style="
                    padding: 0.5cm;
                    display: inline-block;
                    font-size: large;
                  "
                  >#{{ index + 1 }}</span
                >
              </v-col>
              <v-col cols="3" sm="2" md="1">
                <v-avatar class="ma-3" size="75" rounded="1">
                  <v-img :src="element.avatar"></v-img>
                </v-avatar>
              </v-col>
              <v-col justify="center">
                <v-card-title style="margin-left: 0.5cm">{{
                  element.name
                }}</v-card-title>
              </v-col>
              <v-col align="end">
                <v-btn
                  color="info"
                  height="100"
                  variant="tonal"
                  :href="element.intro"
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
          <h1 class="text-center">Candidates</h1>
        </template>
        <template #item="{ element, index }">
          <v-card class="person-card">
            <v-row align="center">
              <v-col cols="3" sm="2" md="1">
                <v-avatar class="ma-3" size="75" rounded="1">
                  <v-img :src="element.avatar"></v-img>
                </v-avatar>
              </v-col>
              <v-col justify="center">
                <v-card-title style="margin-left: 0.5cm">{{
                  element.name
                }}</v-card-title>
              </v-col>
              <v-col align="end">
                <v-btn
                  color="info"
                  height="100"
                  variant="tonal"
                  :href="element.intro"
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
      >
        <template #header>
          <h1 class="text-center">No</h1>
          <p class="text-center">
            You think these candidates <i>wouldn't</i> be suitable as Directors
          </p>
        </template>
        <template #item="{ element, index }">
          <v-card class="person-card">
            <v-row align="center">
              <v-col cols="3" sm="2" md="1">
                <v-avatar class="ma-3" size="75" rounded="1">
                  <v-img :src="element.avatar"></v-img>
                </v-avatar>
              </v-col>
              <v-col justify="center">
                <v-card-title style="margin-left: 0.5cm">{{
                  element.name
                }}</v-card-title>
              </v-col>
              <v-col align="end">
                <v-btn
                  color="info"
                  height="100"
                  variant="tonal"
                  :href="element.intro"
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
interface Person {
  name: string;
  avatar: string;
  intro: string;
}
function shuffle(array: Person[]) {
  let currentIndex = array.length,
    randomIndex;

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
      mailtoSubject: "Tauri election 2023".replace(" ", "%20"),
      mailtoBody: "Thank you for voting!".replace(" ", "%20"),
      yesList: <Person[]>[],
      noList: <Person[]>[],
      candidatesList: shuffle([
        {
          name: "Robin van Boven A",
          avatar: "https://avatars.githubusercontent.com/u/497556",
          intro: "https://hackmd.io/IuH6Fp9CTv-TYKD2G7jxOA",
        },
        {
          name: "Robin van Boven B",
          avatar: "https://avatars.githubusercontent.com/u/497556",
          intro: "https://hackmd.io/IuH6Fp9CTv-TYKD2G7jxOA",
        },
        {
          name: "Robin van Boven C",
          avatar: "https://avatars.githubusercontent.com/u/497556",
          intro: "https://hackmd.io/IuH6Fp9CTv-TYKD2G7jxOA",
        },
      ]),
    };
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
</style>
