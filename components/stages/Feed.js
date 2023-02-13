const Feed = {
	template: /*html*/ `
						<div class="program-designer__content" v-if="loaded">
							<div class="program-designer__block">
								<div class="program-designer__menu-title">Питание</div>
								<div class="program-designer__menu-subtitle">
									Меню предоставляется на выбор:
								</div>
								<div class="program-designer__menu-type">
									<div class="program-designer__menu-item">
										<span class="program-designer__menu-label"
											>Стандартное</span
										>
										<span class="program-designer__menu-text">-</span>
										<span class="program-designer__menu-text flex-1"
											>Включает как холодные, так и горячие блюда.</span
										>
									</div>
									<div class="program-designer__menu-item">
										<span class="program-designer__menu-label">Постное</span>
										<span class="program-designer__menu-text">-</span>
										<span class="program-designer__menu-text flex-1"
											>Исключены мясные, рыбные и молочные продукты. В
											приготовлении используются фрукты, овощи, орехи, грибы.Из
											основы – каши.</span
										>
									</div>
									<div class="program-designer__menu-item">
										<span class="program-designer__menu-label">Детское</span>
										<span class="program-designer__menu-text">-</span>
										<span class="program-designer__menu-text flex-1"
											>Рекомендовано для детей от 2 лет. Еда состоит из мягких,
											легких для пережевывания продуктов</span
										>
									</div>
								</div>
							</div>
							<div class="program-designer__calc">
								<div
									class="program-designer__calc-item program-designer_calc-header"
								>
									<div class="program-designer__calc-col">
										<span class="program-designer__calc-title"
											>Задать всем гостям</span
										>
									</div>
									<div class="program-designer__calc-col">
										<select class="custom-select custom-select__body" v-model="toAllFeed.type">
											<option selected disabled hidden value="default">Тип меню</option>
											<option class="custom-select__item" v-for="type in menuTypes" :key="type.id" :value="type">{{type.title}}</option>
										</select>									
									</div>
									<div class="program-designer__calc-col">
										<select class="custom-select custom-select__body" v-model="toAllFeed.graph">
											<option selected disabled hidden value="default">График питания</option>
											<option 
												class="custom-select__item" 
												v-for="item in toAllFeed.type['meals_schedules']" 
												:key="item.id" 
												:value="item"
											>
												{{item.formatted}}
											</option>
										</select>
									</div>									
									<div
										class="program-designer__calc-col program-designer__calc-subtitle"
										
									>
										Сумма:
										<span class="program-designer__calc-price" 
											><b v-if="toAllFeed.graph !== 'default'">{{toAllFeed.graph.amount * peopleAmount}}</b> ₽</span
										>
									</div>
								</div>
								<span class="program-designer__calc-subtitle"
									>Или задать каждому гостю:</span
								>
								<div class="program-designer__calc-item" v-for="(guest, i) in copyGuests" :key="guest.id">
									<div class="program-designer__calc-col">
										<span class="program-designer__calc-title"
											>{{guest.id}}. {{guest.type}}</span
										>
									</div>
									<div class="program-designer__calc-col" >
										<select class="custom-select custom-select__body" v-model="guest.feed.type">
											<option selected disabled hidden value="default">Тип меню</option>
											<option class="custom-select__item" v-for="type in menuTypes" :key="type.id" :value="type">{{type.title}}</option>
										</select>									
									</div>
									<div class="program-designer__calc-col">
										<select class="custom-select custom-select__body" v-model="guest.feed.graph">
											<option selected disabled hidden value="default">График питания</option>
											<option 
												class="custom-select__item" 
												v-for="item in guest.feed.type['meals_schedules']"
												:key="item.id"
												:value="item"
											>
												{{item.formatted}}
											</option>
										</select>
									</div>
									<div
										class="program-designer__calc-col program-designer__calc-subtitle"
									>
										<span class="program-designer__calc-price"
											><b v-if="guest.feed.graph !== 'default' && guest.feed.graph">{{guest.feed.graph.amount}}</b> ₽</span
										>
									</div>
								</div>
							</div>

							<div class="program-designer__total-details" v-if="isPersonalFeed">
								<div class="program-designer__total-detail">
									<div class="program-designer__menu-subtitle" >
										Завтраков: {{breakfastAmount}}
									</div>
									<div class="program-designer__menu-subtitle" >
										Обедов: {{lunchAmount}}
									</div>
									<div class="program-designer__menu-subtitle">
										Ужинов: {{dinnerAmount}}
									</div>
								</div>
								<div class="program-designer__total">
									<div class="program-designer__menu-subtitle flex-1 mt-0">
										ИТОГО:
									</div>
									<span class="program-designer__calc-price ml-20"
										><b>{{feedPrice}}</b> ₽</span
									>
								</div>
							</div>

						</div>
						<div class="program-designer__footer">
							<AmountResult />
						</div>
						<div v-if="alertSpan" class="red show ml-auto mw-fit">{{alertSpan}}</div>
						<div class="program-designer__nav">
							<button class="vp-btn-inline mr-20" @click="clickToPervStage">Назад</button>
							<button class="vp-btn" @click="clickToNextStage">Дальше</button>
						</div>						
					`,
	data: () => ({
		toAllFeed: {
			graph: 'default',
			type: 'default',
		},
		copyGuests: [],
		alertSpan: '',
		menuTypes: [],
		loaded: false,
	}),
	computed: {
		guests() {
			return this.$store.getters['getGuests']
		},
		peopleAmount() {
			return this.guests.length
		},
		isPersonalFeed() {
			let result = true
			this.guests.forEach(guest => {
				if (guest.feed.graph === 'default' || guest.feed.type === 'default') {
					result = false
				}
			})
			return result
		},
		breakfastAmount() {
			let result = 0
			this.guests.forEach(guest => {
				if (guest.feed.graph.formatted.split('+').includes('Завтрак')) result++
			})
			return result
		},
		lunchAmount() {
			let result = 0
			this.guests.forEach(guest => {
				if (guest.feed.graph.formatted.split('+').includes('Обед')) result++
			})
			return result
		},
		dinnerAmount() {
			let result = 0
			this.guests.forEach(guest => {
				if (guest.feed.graph.formatted.split('+').includes('Ужин')) result++
			})
			return result
		},
		feedPrice() {
			let result = 0
			this.guests.forEach(guest => {
				result += guest.feed.graph.amount
			})
			return result
		},
	},
	methods: {
		clickToPervStage() {
			this.$emit('clickToPerv')
		},
		clickToNextStage() {
			this.$emit('clickToNext')
		},
	},
	async mounted() {
		this.copyGuests = [...this.$store.getters['getGuests']]
		const { data } = await fetch(
			'http://valaamskiy-polomnik.directpr.beget.tech/api/constructor/'
		).then(response => response.json())
		this.menuTypes = data.feeds
		this.loaded = true
	},
	watch: {
		toAllFeed: {
			handler() {
				this.copyGuests = this.copyGuests.map(guest => ({
					...guest,
					feed: { ...this.toAllFeed },
				}))
			},
			deep: true,
		},
		copyGuests: {
			handler() {
				this.$store.commit('setGuests', [...this.copyGuests])
				if (this.isPersonalFeed)
					this.$store.commit('setFeedsPrice', this.feedPrice)
			},
			deep: true,
		},
		guests: {
			handler() {
				this.copyGuests = [...this.$store.getters['getGuests']]
			},
			deep: true,
		},
	},
	components: { Tabs, AmountResult, Stages },
}
