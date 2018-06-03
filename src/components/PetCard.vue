<template>
  <v-card>
    <v-card-media v-if="photo" :src="photo" height="200px"/>
    <v-card-title>
      <div>
        <h3 class="headline mb-0">{{animal, breed}}</h3>
        <v-list>
          <v-list-tile>
            <v-list-tile-action>
              Age
            </v-list-tile-action>
            <v-list-content>
              {{age}}
            </v-list-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              Colors
            </v-list-tile-action>
            <v-list-content>
              {{colors}}
            </v-list-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              Contacts
            </v-list-tile-action>
            <v-list-content>
              {{contacts}}
            </v-list-content>
          </v-list-tile>
        </v-list>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "PetCard",
  props: {
    animal: {
      type: String,
    },
    breed: {
      type: String,
    },
    age: {
      type: Number,
    },
    colors: {
      type: Array,
    },
    contacts: {
      type: String,
    },
    photo: {
      type: String,
    },
  }
}
</script>

