<style lang="scss" scoped>
tbody{
    tr {
        &:nth-child(2n) {
            background: #CCC;
        }
    }
}
</style>


<template>
    <div id="crocs">
        <router-link to="/">Homepage</router-link>
        <hr>
        <label>
            Search Crocodillians:
            <input v-model="query" @keyup="doQuery"/>
            <!-- {{queryResults.uuid}} -->
            
        </label>
        <table style="width: 100%">
            <thead>
                <th>Name</th>
                <th>Age</th>
                <th>Species</th>
                <th>Country</th>
                <th>Likes to Eat</th>
            </thead>
            <!-- {{resultado}} -->
            <tbody>
                <tr v-for="result in resultado" :key="result.uuid">
                    <td>{{result.name}}</td>
                    <td>{{result.age}}</td>
                    <td>{{result.species}}</td>
                    <td>{{result.country}}</td>
                    <td>{{result.eats}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import fz from 'fuzzaldrin-plus';
import Crocodilians from './assets/crocodilians.json';
export default {
    data: function (){
        return {
           query: '',
           options: Crocodilians,
           resultado: [],
        }
    },
    computed: {
        queryResults() {
        if(!this.query) return this.options;

        const preparedQuery = fz.prepareQuery(this.query);
        const scores = {};

        return this.options
            .map((option, index) => {
            const scorableFields = [
                option.uuid,
                option.name,
                option.species,
                option.country,
                option.eats,
                `${option.age}`,
            ].map(toScore => fz.score(toScore, this.query, { preparedQuery }));

            scores[option.uuid] = Math.max(...scorableFields);

            return option;
            })
            .filter(option => scores[option.uuid] > 1)
            .sort((a, b) => scores[b.uuid] - scores[a.uuid])
        ;
        }
    },
    methods: {
        doQuery() {
            this.resultado = this.queryResults;
        }
    }
}
</script>
