<template>
    <v-container>
        <v-row>
            <v-col align="center">
                <v-btn color="success" width="5cm" height="1.25cm" :disabled="candidatesList.length > 0"
                    :href="mailto + '?subject=' + mailtoSubject + '&body=' + mailtoBody + '%0D%0A%0D%0AVoted Yes%0D%0A' + yesList.map(val => val.name).join('%0D%0A') + '%0D%0A%0D%0AVoted No%0D%0A' + noList.map(val => val.name).join('%0D%0A')">Submit</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" style="border:1px solid #333;border-radius: 16px;margin-top:0.5cm">
                <h1 class="text-center">Yes</h1>
                <p class="text-center">These are people you are voting yes for. The higher they are in the list the more you
                    want to see them
                    voted
                    in.</p>
                <draggable :list="yesList" group="people" itemKey="name">
                    <template #item="{ element, index }">
                        <v-card class="person-card">
                            <v-row align="center">
                                <v-col cols="3" sm="2" md="1">
                                    <v-avatar class="ma-3" size="75" rounded="1">
                                        <v-img :src="element.avatar"></v-img>
                                    </v-avatar>
                                </v-col>
                                <v-col justify="center">
                                    <v-card-title>{{ element.name }}</v-card-title>
                                </v-col>
                                <v-col align="end">
                                    <v-btn color="info" height="100" variant="tonal" :href="element.intro"
                                        target="_blank">Readme</v-btn>
                                </v-col>
                            </v-row>
                        </v-card>
                    </template>
                </draggable>
            </v-col>
            <v-col cols="12" style="border:1px solid #333;border-radius: 16px;margin-top:0.5cm">
                <h1 class="text-center">No</h1>
                <p class="text-center">These are people you are voting no for.</p>
                <draggable :list="noList" group="people" itemKey="name">
                    <template #item="{ element, index }">
                        <v-card class="person-card">
                            <v-row align="center">
                                <v-col cols="3" sm="2" md="1">
                                    <v-avatar class="ma-3" size="75" rounded="1">
                                        <v-img :src="element.avatar"></v-img>
                                    </v-avatar>
                                </v-col>
                                <v-col justify="center">
                                    <v-card-title>{{ element.name }}</v-card-title>
                                </v-col>
                                <v-col align="end">
                                    <v-btn color="info" height="100" variant="tonal" :href="element.intro"
                                        target="_blank">Readme</v-btn>
                                </v-col>
                            </v-row>
                        </v-card>
                    </template>
                </draggable>
            </v-col>
            <v-col v-if="candidatesList.length > 0" cols="12"
                style="border:1px solid #333;border-radius: 16px;margin-top:0.5cm">
                <h1 class="text-center">Candidates</h1>
                <p class="text-center">You have to vote either yes or no on all of them</p>
                <draggable :list="candidatesList" group="people" itemKey="name">
                    <template #item="{ element, index }">
                        <v-card class="person-card">
                            <v-row align="center">
                                <v-col cols="3" sm="2" md="1">
                                    <v-avatar class="ma-3" size="75" rounded="1">
                                        <v-img :src="element.avatar"></v-img>
                                    </v-avatar>
                                </v-col>
                                <v-col justify="center">
                                    <v-card-title>{{ element.name }}</v-card-title>
                                </v-col>
                                <v-col align="end">
                                    <v-btn color="info" height="100" variant="tonal" :href="element.intro"
                                        target="_blank">Readme</v-btn>
                                </v-col>
                            </v-row>
                        </v-card>
                    </template>
                </draggable>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
interface Person {
    name: string;
    avatar: string;
    intro: string;
}
export default {
    data() {
        return {
            mailto: 'mailto:board@tauri.app',
            mailtoSubject: 'Tauri election 2023'.replace(' ', '%20'),
            mailtoBody: 'Thank you for voting!'.replace(' ', '%20'),
            yesList: <Person[]>[
            ],
            noList: <Person[]>[
            ],
            candidatesList: <Person[]>[
                { name: "Robin van Boven A", avatar: 'https://avatars.githubusercontent.com/u/497556', intro: 'https://hackmd.io/IuH6Fp9CTv-TYKD2G7jxOA' },
                { name: "Robin van Boven B", avatar: 'https://avatars.githubusercontent.com/u/497556', intro: 'https://hackmd.io/IuH6Fp9CTv-TYKD2G7jxOA' },
                { name: "Robin van Boven C", avatar: 'https://avatars.githubusercontent.com/u/497556', intro: 'https://hackmd.io/IuH6Fp9CTv-TYKD2G7jxOA' },
            ]
        };
    }
};
</script>

<style>
.person-card {
    cursor: move;
    margin-top: 16px;
}
</style>
