<template>
    <div class="col">
        <div class="col center">
            <a class="submit-button"
                :href="mailto + '?subject=' + mailtoSubject + '&body=' + mailtoBody + '%0D%0A%0D%0AVoted Yes%0D%0A' + yesList.map(val => val.name).join('%0D%0A') + '%0D%0A%0D%0AVoted No%0D%0A' + noList.map(val => val.name).join('%0D%0A')">Submit</a>
        </div>
        <div class="col center">
            <h3>Yes</h3>
            <p>These are people you are voting yes for. The higher they are in the list the more you want to see them voted
                in.</p>
            <draggable class="list-group" :list="yesList" group="people" @change="log" itemKey="name">
                <template #item="{ element, index }">
                    <div class="list-group-item">
                        <img :src="element.avatar">
                        <span>{{ element.name }} {{ index }}</span>
                        <a :href="element.intro" target="_blank">Intro</a>
                    </div>
                </template>
            </draggable>
        </div>

        <div class="col center">
            <h3>No</h3>
            <p>These are people you are voting no for.</p>
            <draggable class="list-group" :list="noList" group="people" @change="log" itemKey="name">
                <template #item="{ element, index }">
                    <div class="list-group-item">
                        <img :src="element.avatar">
                        <span>{{ element.name }} {{ index }}</span>
                        <a :href="element.intro" target="_blank">Intro</a>
                    </div>
                </template>
            </draggable>
        </div>
    </div>
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
            mailtoSubject: 'I am voting!'.replace(' ', '%20'),
            mailtoBody: 'Thank you for voting!'.replace(' ', '%20'),
            yesList: <Person[]>[
            ],
            noList: <Person[]>[
                { name: "Robin van Boven A", avatar: 'https://avatars.githubusercontent.com/u/497556', intro: 'https://hackmd.io/IuH6Fp9CTv-TYKD2G7jxOA' },
                { name: "Robin van Boven B", avatar: 'https://avatars.githubusercontent.com/u/497556', intro: 'https://hackmd.io/IuH6Fp9CTv-TYKD2G7jxOA' },
                { name: "Robin van Boven C", avatar: 'https://avatars.githubusercontent.com/u/497556', intro: 'https://hackmd.io/IuH6Fp9CTv-TYKD2G7jxOA' },
            ],
        };
    },
    methods: {
        add: function () {
            this.list.push({ name: "Juan" });
        },
        replace: function () {
            this.list = [{ name: "Edgard" }];
        },
        clone: function (el) {
            return {
                name: el.name + " cloned"
            };
        },
        log: function (evt) {
            window.console.log(evt);
        }
    }
};
</script>

<style>
:root {
    font-family: 'Courier New', Courier, monospace;
}

html,
body {
    background: #242526;
    color: #fff;
    user-select: none;
}

.row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    flex-grow: 1;
}

.col {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    flex-grow: 1;
    width: 100%;
}

.center {
    text-align: center;
}

.submit-button {
    display: block;
    width: 5cm;
    background: #333;
    color: #fff;
    text-decoration: none;
    height: 1cm;
    text-align: center;
    line-height: 1cm;
    border-radius: 4px;
    box-shadow: 0 0 2px 0 #000;
}

.submit-button:hover {
    background: #444;
    color: #fff;
}

.submit-button:active {
    background: #111;
    color: #fff;
}

.list-group {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 50%;
    flex-grow: 1;
    min-height: 1cm;
    border: 1px solid #fff;
}

.list-group-item {
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 10px 15px;
    margin-bottom: -1px;
    background-color: #242526;
    border: 1px solid #ddd;
    width: 100%;
    flex-grow: 1;
    border-radius: 4px;
    box-shadow: 0 0 2px 1px #000;
    margin: 4px;
    cursor: move;
    height: 2.5cm;
    line-height: 2.5cm;
}

.list-group-item>span {
    margin-left: 1cm;
    flex-grow: 1;
}

.list-group-item>a {
    text-decoration: none;
    background: #333;
    color: #fff;
    display: block;
    border-radius: 4px;
    min-width: 2cm;
    box-shadow: 0 0 2px 0 #000;
}

.list-group-item>a:hover {
    background: #444;
    color: #fff;
}

.list-group-item>a:active {
    background: #111;
    color: #fff;
}

.list-group-item>img {
    width: 2.5cm;
    height: 2.5cm;
    display: inline-block;
    border-radius: 100%;
}
</style>
