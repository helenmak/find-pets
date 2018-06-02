<template>
  <v-layout row justify-center>
    <v-dialog 
      v-model="dialog" 
      persistent 
      max-width="500px" 
      width="500px"
    >
      <v-card flat slot="activator">
        <v-card-text>
          <v-btn block flat @click="toggleMapEditMode">
            Add lost <v-icon right>add</v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <v-select
            :items="animals"
            :filter="filter"
            v-model="currentAnimal"
            item-text="type"
            item-value="id"
            label="Your pet"
            autocomplete
            hide-details
          />

          <v-select
            :items="breeds[currentAnimal]"
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
                {{data.item.name}}
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
                  >{{data.item.name}}</v-chip>
                </v-list-tile-content>
              </template>
            </template>
          </v-select>

          <v-text-field
            label="Contacts" 
            multi-line
            rows="2"
            auto-grow
            v-model="contacts"
            hide-details
          />

          <v-flex d-flex class="mt-1">
            <image-preview :image="photoUrl"/>
            <v-text-field
              label="Your pet photo"
              hint="Paste here photo url"
              v-model="photoUrl"
            />
          </v-flex>
        </v-card-text>


        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" flat @click.native="closeDialog">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="closeDialog">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import ImagePreview from './ImagePreview'

export default {
  name: "AddLostCard",
  components: { ImagePreview },
  data: () => ({
    dialog: false,
    mapEditMode: false,
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
    closeDialog () {
      this.dialog = false
    },
    toggleMapEditMode () {
      this.mapEditMode = !this.mapEditMode
      this.$bus.$emit('mapEditMode', this.mapEditMode)
    }
  }
}
</script>

<style lang="stylus" scoped>
.add-lost--list-item
  border 1px solid black
  border-radius 50%

</style>

