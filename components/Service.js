const Service = {
	template: /*html*/ `
								<div class="popular-list list-3 h-fit">
									<div class="popular-list__header">
										<img
											:src="'http://valaamskiy-polomnik.directpr.beget.tech' + service.gallery[0]"
											alt="Services images"
											class="popular-list__img"
										/>
										<div class="popular-list__link">
											<div class="popular-list__title bg-while blue ta-center">
												{{service.pagetitle}}
											</div>
										</div>
									</div>
									<div class="popular-list__footer">
										<div class="popular-list__price flex-1 bg-blue">
											<span class="popular-list__price-value while"
												>{{service.amount}} ₽</span
											>
										</div>
										<div class="popular-list__link flex-1">
											<a class="popular-list__btn w-100" :href="service.url" target="_blank">Подробнее</a>
										</div>
									</div>
								</div>
	`,
	props: ['service'],
}
