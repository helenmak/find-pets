<template>
	<v-layout justify-center row>
		<v-card
			max-width="500px"
			persistent
			v-model="dialog"
			width="500px"
		>
			<v-card>
				<v-card-text>
					<v-select
						:filter="filter"
						:items="animals"
						autocomplete
						clearable
						hide-details
						item-text="type"
						label="Pet type"
						v-model="currentAnimal"
					/>

					<v-select
						:filter="filter"
						:items="prop(path(['id'], currentAnimal), breeds)"
						autocomplete
						clearable
						hide-details
						:disabled="not(currentAnimal)"
						label="Breed"
						v-model="currentBreed"
					/>

					<v-text-field
						hide-details
						label="Age"
						v-model.number="age"
					/>

					<v-select
						:items="colors"
						chips
						clearable
						hide-details
						hide-selected
						item-text="name"
						label="Color"
						multiple
						tags
						v-model="currentColors"
					>
						<template slot="selection" slot-scope="data">
							<v-chip
								:color="data.item.name === 'white' ? 'black' : data.item.color"
								:key="data.item.name"
								:outline="data.item.name === 'white'"
								:selected="data.selected"
								:text-color="data.item.name === 'black' ? 'white' : 'black'"
								@input="data.parent.selectItem(data.item)"
								class="chip--select-multi"
								label
							>
								{{data.item.name}}
							</v-chip>
						</template>
						<template slot="item" slot-scope="data">
							<template>
								<v-list-tile-content>
									<v-chip
										:color="data.item.name === 'white' ? 'black' : data.item.color"
										:outline="data.item.name === 'white'"
										:text-color="data.item.name === 'black' ? 'white' : 'black'"
										label
									>{{data.item.name}}
									</v-chip>
								</v-list-tile-content>
							</template>
						</template>
					</v-select>
				</v-card-text>

				<v-card-actions>
					<v-spacer/>
					<v-btn @click.native="resetFilters" color="blue darken-1" flat>Reset filters</v-btn>
					<v-btn @click.native="findPets" color="blue darken-1" flat>Find</v-btn>
				</v-card-actions>
			</v-card>
		</v-card>
	</v-layout>
</template>

<script>
	import ImagePreview from './ImagePreview'
	import {filter, not, or, isNil, isEmpty, path, prop, toLower, gt} from 'ramda'

	import animals from '../data/animals'
	import breeds from '../data/breeds'
	import colors from '../data/colors'

	export default {
		name: 'FindPetCard',
		components: {ImagePreview},
		props: {
			id: '',
			type: ''
		},
		data: () => ({
			dialog: false,
			currentAnimal: null,
			currentBreed: null,
			contacts: null,
			age: null,
			currentColors: [],
			photoUrl: null,
			animals,
			breeds,
			colors
		}),
		watch: {
			currentAnimal() {
				this.currentBreed = null
				this.age = null
				this.currentColors = []
			}
		},
		methods: {
			path,
			prop,
			not,
			filter(itemObj, queryText = '', itemText = '') {
				const getString = val => val || ''
				const text = getString(itemText)
				const query = getString(queryText)
				return gt(toLower(text).indexOf(toLower(query)), -1)
			},
			resetFilters() {
				this.currentAnimal = null
				this.currentBreed = null
				this.age = null
				this.currentColors = []
			},
			findPets() {
				const colors = this.currentColors.map(color => color.name)
				const animal = path(['type'], this.currentAnimal)
				const searchFields = {
					animal,
					breed: this.currentBreed,
					age: this.age,
					colors,
					status: this.type
				}
				const searchQuery = filter(search => not(or(isNil(search), isEmpty(search))), searchFields)
				this.$bus.$emit('searchPets', searchQuery)
			}
		}
	}
</script>
