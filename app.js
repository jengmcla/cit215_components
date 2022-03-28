// Vue.component('counter', {
//     data: function() {
//         return {
//             count: 0
//         }
//     },
//
//     props: ['mess'],
//
//     // count++ increases
//     template: '<button v-on:click="count++">{{ mess }} {{ count }} times.</button>'
// });

Vue.component('character-item', {

    props: ['character'],

    template: '\
    <p>\
      <span v-on:click="$emit(\'hide\')" v-bind:class="{hide: character.flipped}">{{ character.name }}</span>\
      <span v-on:click="$emit(\'hide\')" v-bind:class="{hide: !character.flipped}">{{ character.codename }}</span>\
    </p>\
  ',
});

var app = new Vue({
    el: "#app",
    data: {
        nameInput: "",
        emailInput: "",
        message: "",
        submit: "Not submitted.",
        characters: [
            {
                name: "Protagonist",
                codename: "Joker",
                flipped: false
            },
            {
                name: "Anne",
                codename: "Panther",
                flipped: false
            },
            {
                name: "Ryuji",
                codename: "Skull",
                flipped: false
            }
        ]
    },
    methods: {
        validEmail: function(emailInput) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(emailInput);
        },
        onHide: function (index) {
            this.characters[index].flipped = !this.characters[index].flipped;
        }
    },
    computed: {
        inputNameEmail: function() {
            // you always have to RETURN in computed functions
            return [this.nameInput, this.emailInput];
        }
    },
    // called watcher, but you have to write watch
    watch: {
        inputNameEmail: function() {
            if( this.nameInput.length < 2 && !this.validEmail(this.emailInput) ) {
                this.message = "Not enough characters in name, and the email must be formatted like xxx@example.com.";
            } else if ( this.nameInput.length >= 2 && !this.validEmail(this.emailInput) ) {
                this.message = "The email must be formatted as xxx@example.com."
            } else if ( this.nameInput.length < 2 && this.validEmail(this.emailInput)) {
                this.message = "Not enough characters in name.";
            } else if ( this.nameInput.length >= 2 && this.validEmail(this.emailInput) ) {
                this.message = "";
                this.submit = "Submitted."
            }
        }
    }
});