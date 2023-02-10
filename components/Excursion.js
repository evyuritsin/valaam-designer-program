const Excursion = {
	template: /*html*/ `
								<div class="find-list" v-if='excursion.schedules[0]'>
									<img
										class="find-list__img"
										:src="'http://valaamskiy-polomnik.directpr.beget.tech' + excursion.images[0]['sg_image']"
										:alt="excursion.images[0]['sg_image']"
									/>
									<div class="find-list__content">
										<div class="find-list__header">
											<div class="find-list__col border-none">
												<div class="find-list__title">
													<a class="find-list__link" href="#">{{excursion.pagetitle}}</a>
												</div>
												<div class="find-list__desc mt-10">
													{{excursion.introtext}}
												</div>
											</div>
										</div>
										<div class="find-list__footer">
											<div class="checkbox__label mr-10" v-for="item in schedules" :key="item.id">
												<input 
													type="checkbox" 
													class="checkbox" 
													@change="e => clickToCheckbox(e, item)" 
													:checked="!tourist.adults && !tourist.children ? false : isSelected(item.id)"
													:disabled="!tourist.adults && !tourist.children"
												/>
												<span class="checkbox__text">{{item.day}}.{{item.month.length === 2 ? item.month : '0' + item.month}} | {{item.hour}}:{{item.minute}}</span>
											</div>
											<div class="find-list__date-item">
												<span class="find-list__date-item-last"
													>Ещё время</span
												>
											</div>
										</div>
									</div>
									<div class="find-list__price">
										<div class="find-list__body-price">
											<div class="index-form justify-between">
												<div class="index-form__label flex-n pl-10">
													<span class="index-form__text index-form_one-line"
														>Взрослых</span
													>
												</div>
												<div
													class="index-form__input flex-n ml-10"
												>
													<div class="index-form__btn-minus" @click="deleteAdults"></div>
													<span class="index-form__value index-form_value-lite"
														>{{tourist.adults}}</span
													>
													<div class="index-form__btn-plus" @click="addAdults"></div>
												</div>
											</div>
											<div class="index-form justify-between">
												<div class="index-form__label flex-n pl-10">
													<span class="index-form__text index-form_one-line"
														>Детей</span
													>
												</div>
												<div
													class="index-form__input flex-n ml-10"
												>
													<div class="index-form__btn-minus" @click="deleteChildren"></div>
													<span class="index-form__value index-form_value-lite"
														>{{tourist.children}}</span
													>
													<div class="index-form__btn-plus" @click="addChildren"></div>
												</div>
											</div>
											<span class="find-list__price-value mt-40">{{this.excursion.schedules[0].amount}} ₽</span>
										</div>
										<div class="find-list__footer-price">
											<button class="find-list__footer-link">Смотреть</button>
										</div>
									</div>
									<div class="excursion-list__duration">
										<img
											src="./img/icon_clock.png"
											alt="icon clock"
											class="excursion-list__icon"
										/>
										<span class="excursion-list__time">{{excursion.duration.formatted}}</span>
									</div>
								</div>
	`,
	props: ['excursion'],
	data: () => ({
		tourist: {
			adults: 0,
			children: 0,
		},
		selectExcursions: [],
	}),
	mounted() {
		this.selectExcursions = [...this.$store.getters['getExcursions']]
	},
	computed: {
		guests() {
			return this.$store.getters['getGuestsObject']
		},
		schedules() {
			return Object.values(this.excursion.featureSchedules).slice(0, 4)
		},
	},
	methods: {
		addAdults() {
			if (this.tourist.adults < Number(this.guests['Взрослых'])) {
				this.tourist.adults++
			}
		},
		deleteAdults() {
			if (this.tourist.adults) {
				this.tourist.adults--
			}
		},
		isSelected(id) {
			let result = false
			this.selectExcursions.forEach(ex => {
				if (ex.id === id) result = true
			})
			return result
		},
		addChildren() {
			if (
				Number(this.guests['Дети 7-12 лет']) &&
				Number(this.guests['Дети от 0-6'])
			) {
				if (
					this.tourist.children <
					Number(this.guests['Дети 7-12 лет']) +
						Number(this.guests['Дети от 0-6'])
				) {
					this.tourist.children++
				}
			} else {
				if (Number(this.guests['Дети 7-12 лет'])) {
					if (this.tourist.children < Number(this.guests['Дети 7-12 лет'])) {
						this.tourist.children++
					}
				} else if (this.tourist.children < Number(this.guests['Дети от 0-6'])) {
					this.tourist.children++
				}
			}
		},
		deleteChildren() {
			if (this.tourist.children) {
				this.tourist.children--
			}
		},
		clickToCheckbox(e, date, time, id) {
			if (e.target.checked) {
				this.$store.commit('addExcursion', {
					title: this.excursion.title,
					date: date,
					time: time,
					id: id,
					price: this.excursion.price,
					tourist: { ...this.tourist },
				})
				this.selectExcursions.push({
					title: this.excursion.title,
					date: date,
					time: time,
					id: id,
					price: this.excursion.price,
					tourist: { ...this.tourist },
				})
			} else {
				this.$store.commit('deleteExcursion', id)
				this.selectExcursions = this.selectExcursion.filter(e => e.id !== id)
			}
		},
	},
	watch: {
		tourist: {
			handler() {
				this.selectExcursions.forEach(e =>
					this.$store.commit('deleteExcursion', e.id)
				)
				this.selectExcursions.forEach(ex =>
					this.$store.commit('addExcursion', { ...ex, tourist: this.tourist })
				)
				if (!this.tourist.adults && !this.tourist.children) {
					this.selectExcursions.forEach(e =>
						this.$store.commit('deleteExcursion', e.id)
					)
					this.selectExcursions = []
				}
			},
			deep: true,
		},
	},
}
