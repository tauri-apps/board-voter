<template>
    <div class="col">
        <div class="col center">
            <a class="submit-button"
                :href="mailto + '?subject=' + mailtoSubject + '&body=' + mailtoBody + '%0D%0A%0D%0AVoted Yes%0D%0A' + list1.map(val => val.name).join('%0D%0A') + '%0D%0A%0D%0AVoted No%0D%0A' + list2.map(val => val.name).join('%0D%0A')">Submit</a>
        </div>
        <div class="col center">
            <h3>Yes</h3>
            <p>These are people you are voting yes for. The higher they are in the list the more you want to see them voted
                in.</p>
            <draggable class="list-group" :list="list1" group="people" @change="log" itemKey="name">
                <template #item="{ element, index }">
                    <div draggable="true" class="list-group-item">{{ element.name }} {{ index }}</div>
                </template>
            </draggable>
        </div>

        <div class="col center">
            <h3>No</h3>
            <p>These are people you are voting no for.</p>
            <draggable class="list-group" :list="list2" group="people" @change="log" itemKey="name">
                <template #item="{ element, index }">
                    <div draggable="true" class="list-group-item">{{ element.name }} {{ index }}</div>
                </template>
            </draggable>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            mailto: 'mailto:board@tauri.app',
            mailtoSubject: 'I am voting!'.replace(' ', '%20'),
            mailtoBody: 'Thank you for voting!'.replace(' ', '%20'),
            list1: [
                { name: "John", id: 1 },
                { name: "Joao", id: 2 },
                { name: "Jean", id: 3 },
                { name: "Gerard", id: 4 }
            ],
            list2: [
                { name: "Juan", id: 5 },
                { name: "Edgard", id: 6 },
                { name: "Johnson", id: 7 }
            ]
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
}

.list-group-item {
    position: relative;
    display: block;
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
}
</style>
