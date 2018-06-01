<template>
  <v-menu
    :close-on-content-click="false"
    :close-on-click="false"
    transition="slide-x-transition"
    right
    offset-x
    full-width
  >
    <v-card flat slot="activator">
      <v-card-text>
        <v-btn
          block
          flat
        >
          Add lost <v-icon right>add</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
    <form>
      <v-select
        :items="animals"
        :filter="filterPets"
        v-model="currentAnimal"
        item-text="type"
        item-value="id"
        label="Your pet"
        autocomplete
      />

      <v-select
        :items="breeds[currentAnimal]"
        :filter="filterPets"
        label="Breed"
        autocomplete
      />
    </form>
  </v-menu>
</template>

<script>
export default {
  name: "AddLostCard",
  data: () => ({
    fotoUrl: null,
    currentAnimal: '',
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
    ],
    breeds: {
      dog: ['Afghan Hound', 'Spaniel', 'Bulldog', 'Cocker Spaniel', 'Collie', 'Boxer', 'Cesky Terrier', 'Chihuahua', 'Dalmatian', 'Greyhound', 'Rottweiler'],
      cat: ['Asian', 'Bengal', 'Donskoy', 'Highlander', 'Lykoi', 'Nebelung', 'Sphynx', 'Siamese', 'Ukrainian Levkoy', 'Russian Blue'],
      parrot: ['Amazon', 'Lovebirds', 'King', 'Tiger', 'Pygmy'],
      rabbit: ['American', 'Alaska', 'Angora', 'Beige', 'Belgian', 'Californian', 'Cashmere Lop', 'Czech Red', 'Dalmatian', 'Dwarf Hotot', 'Japanese White', 'Jersey Wooly', 'Lionhead', 'Satin', 'Tan'],
      snake: ['Black Mamba', 'Burmese Python', 'Green Tree Python', 'Green Anaconda', 'King Cobra'],
      fish: ['Giant grouper', 'Red lionfish', 'Goldfish', 'Barbs', 'Danios', 'Catfish', 'Hatchets', 'Livebearing Fish', 'Loaches', 'Rainbowfish'],
      monkey: ['Spider', 'Squirrel', 'Vervet', 'Proboscis', 'Pygmy Marmoset', 'Common Marmoset', 'Gibbon', 'Capuchin Monkey'],
      pig: ['American Yorkshire', 'Danish Protest', 'Göttingen minipig', 'Red Wattle', 'Tamworth', 'Wessex Saddleback'],
      hamster: ['Syrian', 'Dwarf Campbell Russian', 'Dwarf Winter White Russian', 'Roborovski Dwarf', 'Chinese'],
      rat: ['Standard', 'Manx', 'Bald', 'Dumbo', 'Rex']
    }
  }),
  methods: {
    filterPets (item, queryText) {
      const hasValue = val => val != null ? val : ''
      const text = hasValue(item.type)
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

