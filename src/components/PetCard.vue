<template>
  <v-card>
    <v-card-media v-if="photo" :src="photo" height="200px"/>
    <v-card-title>
      <div>
        <h4 class="headline mb-0">{{animal}}, {{breed}}</h4>
        <ul>
          <li>
              Age:
              {{age}}
          </li>
          <li>
              Colors:
              {{colors.join(', ')}}
          </li>
          <li>
              Contacts:
              {{contacts}}
          </li>
        </ul>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "PetCard",
  props: {
    animal: '',
    breed: '',
    age: '',
    contacts: '',
    colors: null,
    photo: ''
  }
}
</script>

