<template>
  <v-layout row justify-center>
    <v-card 
      v-model="dialog" 
      persistent 
      max-width="500px" 
      width="500px"
    >
      <v-card>
        <v-card-text>
          <v-select
            :items="animals"
            :filter="filter"
            v-model="currentAnimal"
            item-text="type"
            label="Pet type"
            autocomplete
            hide-details
          />

          <v-select
            :items="breeds[currentAnimal.id]"
            :filter="filter"
            v-model="currentBreed"
            label="Breed"
            autocomplete
            hide-details
          />

          <v-text-field
            label="Age"
            v-model.number="age"
            hide-details
          />

          <v-select
            :items="colors"
            item-text="name"
            v-model="currentColors"
            label="Color"
            multiple
            chips
            tags
            hide-selected
            hide-details
          >
            <template slot="selection" slot-scope="data">
              <v-chip
                :selected="data.selected"
                :key="data.item.name"
                :color="data.item.name === 'white' ? 'black' : data.item.color"
                :text-color="data.item.name === 'black' ? 'white' : 'black'"
                label
                :outline="data.item.name === 'white'"
                class="chip--select-multi"
                @input="data.parent.selectItem(data.item)"
              >
                {{data.item}}
              </v-chip>
            </template>
            <template slot="item" slot-scope="data">
              <template>
                <v-list-tile-content>
                  <v-chip 
                    :color="data.item.name === 'white' ? 'black' : data.item.color"
                    :text-color="data.item.name === 'black' ? 'white' : 'black'"
                    label
                    :outline="data.item.name === 'white'"
                  >{{data.item}}</v-chip>
                </v-list-tile-content>
              </template>
            </template>
          </v-select>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" flat @click.native="cancelPet">Reset filters</v-btn>
          <v-btn color="blue darken-1" flat @click.native="savePet">Find</v-btn>
        </v-card-actions>
      </v-card>
    </v-card>
  </v-layout>
</template>

<script>
import ImagePreview from './ImagePreview'

export default {
  name: "FindPetCard",
  components: { ImagePreview },
  props: {
    id: ''
  },
  data: () => ({
    dialog: false,
    currentAnimal: '',
    currentBreed: '',
    contacts: '',
    age: '',
    currentColors: [],
    photoUrl: '',
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
    },
    colors: [
      { name: 'black', color: 'black' },
      { name: 'red', color: 'red' },
      { name: 'white', color: 'white' },
      { name: 'grey', color: 'grey' },
      { name: 'blue', color: 'blue' },
      { name: 'yellow', color: 'yellow' },
      { name: 'lightblue', color: '#add8e6' },
      { name: 'green', color: 'green' },
      { name: 'pink', color: 'pink' },
      { name: 'orange', color: 'orange' },
      { name: 'brown', color: 'brown' }
    ]
  }),
  methods: {
    filter (itemObj, query, itemText) {
      const hasValue = val => val != null ? val : ''
      const text = hasValue(itemText)
      const queryText = hasValue(query)
      const format = item => item.toString().toLowerCase()
      return format(text).indexOf(format(queryText)) > -1
    },
    cancelPet () {
      this.dialog = false
      this.$bus.$emit('removeMarker', this.id)
    },
    savePet () {
      const colors = this.currentColors.map(color => color.name)
      const animal = this.currentAnimal.type
      const petData = {
        animal,
        breed: this.currentBreed,
        age: this.age,
        photo: this.photoUrl,
        colors,
        contacts: this.contacts
      }
      this.$emit('savePet', petData)
    }
  }
}
</script>

<style lang="stylus" scoped>
.add-lost--list-item
  border 1px solid black
  border-radius 50%
</style>
