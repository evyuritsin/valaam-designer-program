const Order = {
	template: /*html*/ `
						<div class="program-designer__footer">
							<AmountResult />
						</div>
						<div class="program-designer__content">
							<div class="order-form">
								<div class="order-form__title">Данные заказчика</div>
								<div class="order-form__field">
									<div class="order-form__content-human">
										<div class="order-form__field-contacts">
											<div class="order-form__field-contact">
													<input
														type="text"
														class="vp-input"
														v-model="lastNameModel"
														placeholder="Фамилия*"
														:class="{'vp-input_invalid' : !lastNameModel && validationErrors}"
													/>
													<input
														type="text"
														class="vp-input"
														v-model="firstNameModel"
														placeholder="Имя*"
														:class="{'vp-input_invalid' : !firstNameModel && validationErrors}"
													/>
													<input
														type="text"
														class="vp-input flex-1"
														v-model="middleNameModel"
														placeholder="Отчество*"
														:class="{'vp-input_invalid' : !middleNameModel && validationErrors}"														
													/>
											</div>
											<div class="order-form__field-contact mt-20">
												<div className="flex-1 relative">
													<input
														type="text"
														class="vp-input flatpickr-input"
														v-model="birthdayDateModel"
														placeholder="Дата рождения*"
														name="bdDate"
														:class="{'vp-input_invalid' : !birthdayDateModel && validationErrors}"		
													/>
												</div>
												<div className="relative flex-1" 	@click.stop="openDocumentsPicker">
													<input 
														type="text" 
														readonly 
														class="vp-input w-100 input__icon_right icon_arrowdown" 
														:class="{'vp-input_invalid' : !documentTypeModel && validationErrors}" 
														placeholder="Тип документа*" 
														v-model="documentTypeModel"
													/>
													<Documentspicker v-if="isDocumentsOpen" @selectDoc="selectDoc" @close="closeDocumentsPicker"/>
												</div>
												<div className="flex-1">
													<input
														type="text"
														class="vp-input flex-1"
														v-model="documentIdModel"
														placeholder="Паспорт серия/номер*"
														name="passSN"
														:class="{'vp-input_invalid' : !documentIdModel && validationErrors}"															
													/>
												</div>
											</div>
											<div class="order-form__field-contact mt-20">
												<div className="flex-1">
													<input
														type="text"
														class="vp-input"
														v-model="documentIssuedByModel"
														placeholder="Кем выдан*"
														:class="{'vp-input_invalid' : !documentIssuedByModel && validationErrors}"	
													/>												
												</div>
												<div className="flex-1">
													<input
														type="text"
														class="vp-input input-datedocp"
														placeholder="Дата выдачи*"
														v-model="documentIssueDateModel"
														:class="{'vp-input_invalid' : !documentIssueDateModel && validationErrors}"		
														name="iDate"				
													/>									
												</div>
												<div className="flex-1">
													<input
														type="text"
														class="vp-input"
														placeholder="Адрес регистрации*"
														v-model="addressModel"
														:class="{'vp-input_invalid' : !addressModel && validationErrors}"		
													/>									
												</div>
											</div>
											<div class="order-form__field-contact mt-20">
												<div className="flex-1">
													<input
														type="text"
														class="vp-input"
														placeholder="Телефон*"
														name="telefon"
														v-model="phoneModel"
														:class="{'vp-input_invalid' : !phoneModel && validationErrors}"														
													/>
												</div>
												<div className="flex-1">
													<input
														type="email"
														class="vp-input"
														v-model="emailModel"
														placeholder="E-mail*"
														:class="{'vp-input_invalid' : !emailModel && validationErrors}"														
													/>
												</div>
												<div className="flex-1 relative" @click.stop="openAddsPicker">
													<input 
														v-model="addModel" 
														class="vp-input input__icon_right icon_arrowdown" 
														placeholder="Откуда узнали о нас" 
														readonly
													/>
													<Addpicker v-if="isAddsOpen" @selectAdd="selectAdd" @close="closeAddsPicker"/>
												</div>
											</div>
										</div>
										<div class="order-form__fields-gender">
											<div
												class="order-form__field-gender"
												:class="{'order-form_field-active' : isMale}"
												@click='setMale'
											>
												М
											</div>
											<div 
												class="order-form__field-gender" 
												:class="{'order-form_field-active' : !isMale}"
												@click='setFemale'
											>
												Ж
											</div>
										</div>
									</div>
								</div>
								<div class="checkbox__label mt-10">
									<input id="isPilgrim" type="checkbox" class="checkbox" v-model="client.isPilgrim" />
									<label for="isPilgrim" class="checkbox__text"
										>Заказчик является Паломником</label
									>
								</div>
								<div class="order-form__title">Данные туристов</div>
								<TouristData v-for="(guest, index) in guests" :key="guest.id" :id="guest.id" :validationErrors="validationErrors" :index="index" />
								<div class="order-form__title">Способ оплаты</div>
								<div class="order-form__field pos-h">
									<div class="order-form__group order-form__pay-group">
										<div class="order-form__subtitle">Категория оплаты</div>
										<div class="radiobox__label mt-20" v-for="category in paymentsCategories" :key="category.id">
											<input :value="category.id" v-model="selectCategory" name="categorypay" type="radio" id="rb_standard" class="radiobox" />
											<label for="rb_standard" class="radiobox__text">{{category.title}}</label>
										</div>
										<div class="order-form__help mt-20">
											<a href="#" class="order-form__help-link">Справка</a>
										</div>
									</div>
									<div class="order-form__group order-form__pay-group">
										<div class="order-form__subtitle">Тип платежа</div>
										<div class="radiobox__label mt-20" v-for="type in paymentsTypes" :key="type.id">
											<input :value='type.id' v-model="selectType" name="typepay" type="radio" id="rb_card" class="radiobox" />
											<label for="rb_card" class="radiobox__text">{{type.title}}</label>
										</div>
									</div>
								</div>
								<span v-if="alertSpan" class="red show ml-auto mw-fit pt-10">{{alertSpan}}</span>
								<div class="order-form__field_bottom">
									<button class="vp-btn-inline" @click="clickToPervStage">Назад</button>
										<div class="order-form__agreement">
											<div class="checkbox__label w-fit">
												<input type="checkbox" class="checkbox" id="cb_agree" v-model="agreeWithTerms" />
												<label for="cb_agree" class="checkbox__text"
													>Я согласен с условиями передачи информации</label
												>
											</div>
											<div class="checkbox__label w-fit">
												<input type="checkbox" id="cb_sub" class="checkbox" />
												<label for="cb_sub" class="checkbox__text"
													>Подписаться на рассылку новостей</label
												>
											</div>
										</div>
										<button class="vp-btn" @click="clickToOrder">Оплатить</button>
									</div>
								</div>
							</div>
						</div>`,
	data: () => ({
		isDocumentsOpen: false,
		isAddsOpen: false,
		validationErrors: false,
		isBdDatepicker: false,
		isIssueDate: false,
		paymentsCategories: [],
		paymentsTypes: [],
		agreeWithTerms: true,
		alertSpan: '',
	}),
	computed: {
		guests() {
			return this.$store.getters['getGuests']
		},
		isMale() {
			if (this.client.isPilgrim) {
				return this.firstGuest.gender === 'male' ? true : false
			} else {
				return this.client.gender === 'male' ? true : false
			}
		},
		firstGuest: {
			get() {
				return this.$store.getters.getGuestById(1)[0]
			},
			set() {
				this.$store.commit('setGuest', { ...this.firstGuest })
			},
		},
		client: {
			get() {
				return this.$store.getters['getClient']
			},
			set() {
				this.$store.commit('setClient', { ...this.client })
			},
		},
		lastNameModel: {
			get() {
				return this.client.isPilgrim
					? this.firstGuest.lastname
					: this.client.lastname
			},
			set(val) {
				this.client.isPilgrim
					? (this.firstGuest.lastname = val)
					: (this.client.lastname = val)
			},
		},
		firstNameModel: {
			get() {
				return this.client.isPilgrim
					? this.firstGuest.firstname
					: this.client.firstname
			},
			set(val) {
				this.client.isPilgrim
					? (this.firstGuest.firstname = val)
					: (this.client.firstname = val)
			},
		},
		middleNameModel: {
			get() {
				return this.client.isPilgrim
					? this.firstGuest.patronymic
					: this.client.patronymic
			},
			set(val) {
				this.client.isPilgrim
					? (this.firstGuest.patronymic = val)
					: (this.client.patronymic = val)
			},
		},
		birthdayDateModel: {
			get() {
				return this.client.isPilgrim
					? this.firstGuest.birth_date
					: this.client.birth_date
			},
			set(val) {
				this.client.isPilgrim
					? (this.firstGuest.birth_date = val)
					: (this.client.birth_date = val)
			},
		},
		documentTypeModel: {
			get() {
				return this.client.isPilgrim
					? this.firstGuest.document.type
					: this.client.document.type
			},
			set(val) {
				this.client.isPilgrim
					? (this.firstGuest.document.type = val)
					: (this.client.document.type = val)
			},
		},
		documentIdModel: {
			get() {
				return this.client.isPilgrim
					? this.firstGuest.document.id
					: this.client.document.id
			},
			set(val) {
				this.client.isPilgrim
					? (this.firstGuest.document.id = val)
					: (this.client.document.id = val)
			},
		},
		documentIssuedByModel: {
			get() {
				return this.client.isPilgrim
					? this.firstGuest.document.issued_by
					: this.client.document.issued_by
			},
			set(val) {
				this.client.isPilgrim
					? (this.firstGuest.document.issued_by = val)
					: (this.client.document.issued_by = val)
			},
		},
		documentIssueDateModel: {
			get() {
				return this.client.isPilgrim
					? this.firstGuest.document.issue_date
					: this.client.document.issue_date
			},
			set(val) {
				this.client.isPilgrim
					? (this.firstGuest.document.issue_date = val)
					: (this.client.document.issue_date = val)
			},
		},
		addressModel: {
			get() {
				return this.client.isPilgrim
					? this.firstGuest.address
					: this.client.address
			},
			set(val) {
				this.client.isPilgrim
					? (this.firstGuest.address = val)
					: (this.client.address = val)
			},
		},
		phoneModel: {
			get() {
				return this.client.isPilgrim ? this.firstGuest.phone : this.client.phone
			},
			set(val) {
				this.client.isPilgrim
					? (this.firstGuest.phone = val)
					: (this.client.phone = val)
			},
		},
		emailModel: {
			get() {
				return this.client.isPilgrim ? this.firstGuest.email : this.client.email
			},
			set(val) {
				this.client.isPilgrim
					? (this.firstGuest.email = val)
					: (this.client.email = val)
			},
		},
		addModel: {
			get() {
				return this.client.isPilgrim ? this.firstGuest.add : this.client.add
			},
			set(val) {
				this.client.isPilgrim
					? (this.firstGuest.add = val)
					: (this.client.add = val)
			},
		},
		directory() {
			return this.$store.getters['getData'].directory
		},
		requestData() {
			return this.$store.getters['getRequest']
		},
		selectCategory: {
			get() {
				return this.$store.getters['getPaymentCategory']
			},
			set(val) {
				this.$store.commit('setSelectCategory', val)
			},
		},
		selectType: {
			get() {
				return this.$store.getters['getPaymentType']
			},
			set(val) {
				this.$store.commit('setSelectType', val)
			},
		},
	},
	methods: {
		openDocumentsPicker() {
			if (this.isDocumentsOpen) return (this.isDocumentsOpen = false)
			this.isAddsOpen = false
			this.isBdDatepicker = false
			this.isIssueDate = false

			this.isDocumentsOpen = true
		},
		closeDocumentsPicker() {
			this.isDocumentsOpen = false
		},
		selectDoc(doc) {
			this.client.isPilgrim
				? (this.firstGuest.document.type = doc)
				: (this.client.document.type = doc)
		},
		openAddsPicker() {
			if (this.isAddsOpen) return (this.isAddsOpen = false)
			this.isDocumentsOpen = false
			this.isBdDatepicker = false
			this.isIssueDate = false

			this.isAddsOpen = true
		},
		closeAddsPicker() {
			this.isAddsOpen = false
		},
		selectAdd(add) {
			this.client.isPilgrim
				? (this.firstGuest.add = add)
				: (this.client.add = add)
		},
		openBdDatepicker() {
			if (this.isBdDatepicker) return (this.isBdDatepicker = false)
			this.isDocumentsOpen = false
			this.isAddsOpen = false
			this.isIssueDate = false

			this.isBdDatepicker = true
		},
		closeBdDatepicker() {
			this.isBdDatepicker = false
		},
		selectBirthday(date) {
			this.client.isPilgrim
				? (this.firstGuest.birth_date = date)
				: (this.client.birth_date = date)
		},
		openIssueDate() {
			if (this.isIssueDate) return (this.isIssueDate = false)
			this.isDocumentsOpen = false
			this.isAddsOpen = false
			this.isBdDatepicker = false

			this.isIssueDate = true
		},
		closeIssueDate() {
			this.isIssueDate = false
		},
		selectIssueDate(date) {
			this.client.isPilgrim
				? (this.firstGuest.document.issue_date = date)
				: (this.client.document.issue_date = date)
		},
		setMale() {
			this.client.isPilgrim
				? (this.firstGuest.gender = 'male')
				: (this.client.gender = 'male')
		},
		setFemale() {
			this.client.isPilgrim
				? (this.firstGuest.gender = 'female')
				: (this.client.gender = 'female')
		},
		async clickToOrder() {
			this.validationErrors = true
			this.alertSpan = ''
			if (!this.selectCategory || !this.selectType)
				return (this.alertSpan = 'Выберите тип и категорию оплаты')
			if (!this.agreeWithTerms)
				return (this.alertSpan = 'Согласитесь с правилами')
			setTimeout(async () => {
				const invalidInputs = document.querySelectorAll('.vp-input_invalid')
				if (invalidInputs.length) {
					window.scrollTo(0, invalidInputs[0].offsetTop - 50)
				} else {
					this.validationErrors = false
				}
				if (!this.validationErrors) {
					this.$store.commit(
						'setTourists',
						this.guests.map(guest => {
							delete guest.feed
							return {
								...guest,
								gender_id: guest.gender === 'male' ? 1 : 2,
								discount_category:
									guest.type === 'Взрослый'
										? 1
										: guest.type === 'Ребенок 7-12'
										? 3
										: 2,
							}
						})
					)
					this.$store.commit('setRequestClient', {
						...this.client,
						gender_id: this.client.gender === 'male' ? 1 : 2,
					})

					$.ajax({
						url: 'http://valaamskiy-polomnik.directpr.beget.tech/api/order/',
						method: 'post',
						dataType: 'json',
						data: { data: JSON.stringify({ ...this.requestData }) },
						success: ({ data }) => {
							window.location.href = data.formUrl
						},
					})
				}
			}, 0)
		},
		clickToPervStage() {
			this.$emit('clickToPerv')
		},
	},
	mounted() {
		//add masks
		$('[name=bdDate]').inputmask('99.99.9999')
		$('[name=iDate]').inputmask('99.99.9999')
		$('[name=passSN]').inputmask('9999 999999')
		$('[name=telefon]').inputmask('+7 (999) 999 99 99')

		const vm = this
		$('[name=bdDate]').on('input', e => {
			vm.birthdayDateModel = e.target.value
		})
		$('[name=iDate]').on('input', e => {
			vm.documentIssueDateModel = e.target.value
		})
		$('[name=passSN]').on('input', e => {
			vm.documentIdModel = e.target.value
		})
		$('[name=telefon]').on('input', e => {
			vm.phoneModel = e.target.value
		})

		//add logic to close picker on click to out of theme
		document.addEventListener('click', function () {
			vm.closeDocumentsPicker()
			vm.closeAddsPicker()
			vm.closeBdDatepicker()
			vm.closeIssueDate()
		})

		//detect auth user and autocomplete personal data inputs

		// let jsonAuthUser

		// this.paymentsTypes = Object.values(
		// 	this.directory.tours.prices_payments_types
		// ).filter(type => type.id === 1)

		// this.paymentsCategories = Object.values(
		// 	this.directory.tours.prices_payments_categories
		// ).filter(cat => cat.id === 2)

		// if (authUser) {
		// 	jsonAuthUser = JSON.parse(authUser)

		// 	if (jsonAuthUser.role_id === 3) {
		// 		this.paymentsTypes = Object.values(
		// 			this.directory.tours.prices_payments_types
		// 		).filter(type => type.id === 1 || type.id === 2)
		// 	}
		// }

		// if (jsonAuthUser.role_id === 3) {
		// 	this.paymentsCategories = Object.values(
		// 		this.directory.tours.prices_payments_categories
		// 	).filter(cat => cat.id === 1)
		// }

		// if (jsonAuthUser.id) {
		// 	this.firstNameModel = jsonAuthUser.firstname
		// 	this.middleNameModel = jsonAuthUser.patronymic
		// 	this.lastNameModel = jsonAuthUser.lastname
		// 	this.emailModel = jsonAuthUser.email
		// 	this.phoneModel = jsonAuthUser.phone
		// }
	},
	watch: {
		'client.isPilgrim': {
			handler() {
				if (this.client.isPilgrim) {
					this.$store.commit('changeGuest', {
						id: 1,
						...this.firstGuest,
						...this.client,
						document: { ...this.client.document },
					})
				} else {
					this.client = {
						...this.client,
						document: { ...this.firstGuest.document },
						...this.firstGuest,
					}
				}
			},
			deep: true,
		},
	},
	components: {
		AmountResult,
		TouristData,
		Documentspicker,
		Addpicker,
		Datepicker,
	},
}
