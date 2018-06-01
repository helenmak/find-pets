<template>
  <v-card flat>
    <v-card-title>
      <form>
        <v-select
          :items="animals"
          :filter="filterPets"
          v-model="a1"
          item-text="type"
          label="Your pet"
          autocomplete
        />
      </form>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "AddLostCard",
  data: () => ({
    cardLost: true,
    fotoUrl: null,
    animals: [
      { type: 'Dog', id: 'dog' },
      { type: 'Cat', id: 'cat' },
      { type: 'Parrot', id: 'parrot' },
      { type: 'Rabbit', id: 'rabbit' },
      { type: 'Snake', id: 'snake' },
      { type: 'Fish', id: 'fish' },
      { type: 'Monkey', id: 'monkey' },
      { type: 'Pig', id: 'pig' },
      { type: 'Hamster', id: 'hamster' },
      { type: 'Rat', id: 'rat' }
    ]
  }),
  methods: {
    filterPets (item, queryText, itemText) {
      const hasValue = val => val != null ? val : ''
      const text = hasValue(item.name)
      const query = hasValue(queryText)
      return text.toString()
        .toLowerCase()
        .indexOf(query.toString().toLowerCase()) > -1
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>

