const getFetchRequests = {
	state() {
		return {
			data: {},
			loaded: false,
			isLoaded: false,
		}
	},
	mutations: {
		setData(state, action) {
			state.data = action
		},
		setLoaded(state, action) {
			state.loaded = action
		},
		setIsLoaded(state, action) {
			state.isLoaded = action
		},
	},
	getters: {
		getFetchFetchExcursions(state) {
			return {
				schedules: [...state.data.schedules.excursions],
				directory: { ...state.data.directory.excursions },
			}
		},
		getFetchMeals(state) {
			return {
				schedules: [...state.data.schedules.meals],
				directory: { ...state.data.directory.meals },
			}
		},
		getFetchServices(state) {
			return Object.values(state.data.directory.services.services)
		},
		getFetchShips(state) {
			return {
				schedules: [...state.data.schedules.ships],
				directory: { ...state.data.directory.ships },
			}
		},
		getFetchPlacements(state) {
			return {
				schedules: [...state.data.schedules.placements],
				directory: { ...state.data.directory.placements },
			}
		},
		getData(state) {
			return state.data
		},
		getLoaded(state) {
			return state.loaded
		},
		getIsLoaded(state) {
			return state.isLoaded
		},
	},
	actions: {
		async fetchFirstStage({ commit }, inputsData) {
			commit('setLoaded', false)
			commit('setIsLoaded', true)
			const formData = {
				date_start: inputsData.arrivalDate,
				date_end: inputsData.multiDay
					? inputsData.departureDate
					: inputsData.arrivalDate,
				tourist_count: inputsData.guestsCount,
				dock_departure_id: inputsData.departurePoint.start_dock_id,
			}

			const { data } = await $.ajax({
				url: 'http://valaamskiy-polomnik.directpr.beget.tech/api/constructor/firstStage/',
				method: 'post',
				dataType: 'json',
				data: { data: JSON.stringify(formData) },
				success: data => data,
			})

			//remove last date for placements prices
			const doneData = {
				...data,
				schedules: {
					...data.schedules,
					placements: data.schedules.placements.map(place => ({
						...place,
						prices: place.prices.splice(0, place.prices.length - 1),
					})),
				},
			}

			commit('setData', doneData)
			commit('setLoaded', true)
			commit('setIsLoaded', false)
		},
	},
}
