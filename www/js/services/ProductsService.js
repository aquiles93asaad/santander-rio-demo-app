"user strict";

angular.module('SantanderRioApp')

.factory('ProductsService', ProductsService);

ProductsService.$inject = ['$q'];

/* @ngInject */
function ProductsService($q) {
	var products = [
		{ id: 1, name: 'American Express', image: 'amex.png', category: 'cards',
			description: 'Pedí La Tarjeta Santander Río American Express y empezá a disfrutar de todos los ahorros y beneficios. Ingresos mínimos netos mensuales: $ 6500'},
		{ id: 2, name: 'Visa Internacional', image: 'visa.png', category: 'cards',
			description: 'Pedí tu Tarjeta Santander Río Visa y empezá a disfrutar de todos los ahorros y beneficios. Ingresos mínimos netos mensuales: $ 6500'},
		{ id: 3, name: 'American Express Gold', image: 'amex-gold.png', category: 'cards',
			description: 'Con la Tarjeta Santander Río American Express Gold disfrutá de inigualables beneficios. Ingresos mínimos netos mensuales: $ 30000'},
		{ id: 4, name: 'Visa Gold', image: 'visa-gold.png', category: 'cards',
			description: 'Con la Tarjeta Santander Río Visa Gold pertenecé a un mundo de beneficios y servicios únicos. Ingresos mínimos netos mensuales: $ 30000'},
		{ id: 5, name: 'American Express Platinum', image: 'amex-platinum.png', category: 'cards',
			description: 'Viví los beneficios exclusivos de la Tarjeta Santander Río American Express Platinum. Ingresos mínimos netos mensuales: $ 55000'},
		{ id: 6, name: 'Visa Platinum', image: 'visa-platinum.png', category: 'cards',
			description: 'Con la Tarjeta Santander Río Visa Platinum siempre tenés más. Ingresos mínimos netos mensuales: $ 55000'},
		{ id: 7, name: 'American Express Black', image: 'amex-black.png', category: 'cards',
			description: 'Viví los beneficios exclusivos de La Tarjeta Santander Río American Express Black. Ingresos mínimos netos mensuales: $ 75000'},
		{ id: 8, name: 'Visa Black', image: 'visa-black.png', category: 'cards',
			description: 'Con la Tarjeta Santander Río Visa Black obtenés un mundo de beneficios. Ingresos mínimos netos mensuales: $ 75000'},
		{ id: 9, name: 'Super Cuenta', image: null, category: 'accounts',
			description: 'Ahorrá en todas tus compras con las mejores promociones. Servicio de cuenta, tarjeta de débito, ahorro en tus compras y puntos SuperClub que podés canjear por increíbles premios.'},
		{ id: 10, name: 'Super Cuenta 3', image: null, category: 'accounts',
			description: 'La mejor manera de tener más, todos los días.'},
		{ id: 11, name: 'Infinity', image: null, category: 'accounts', description: 'Un servicio integral y flexible a un precio único.'},
		{ id: 12, name: 'Infinity Gold', image: null, category: 'accounts', description: 'La esencia de ser distinto. Disfruta de ventajas exclusivas y beneficios únicos diseñados para vos.'},
	];

	var service = {
		getProductsByCategory: getProductsByCategory,
		getProductById: getProductById,
		getAll: getAll
	};

	return service;

	function getAll() {
		var deferred = $q.defer();

		setTimeout(function() {
			if(result.length != 0)
				deferred.resolve(products);
			else
				deferred.reject('No hay productos cargados.');
		}, 250);

		return deferred.promise;
	}

	function getProductsByCategory(category) {
		var deferred = $q.defer();

		var result = [];
		var i = 0;
		for(i; i<products.length; i++) {
			if(products[i].category === category)
				result.push(products[i]);
        }

        setTimeout(function() {
            deferred.resolve(result);
		}, 250);

		return deferred.promise;
	}

	function getProductById(id) {
		var deferred = $q.defer();

		var result = undefined;
		var i = 0;
		for(i; i<products.length; i++) {
			if(products[i].id == id)
				result = products[i];
		}

		setTimeout(function() {
			deferred.resolve(result);
		}, 250);

		return deferred.promise;
	}
}
