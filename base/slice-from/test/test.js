/**
* @license Apache-2.0
*
* Copyright (c) 2023 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/* eslint-disable object-curly-newline */

'use strict';

// MODULES //

var tape = require( 'tape' );
var isndarrayLike = require( '@stdlib/assert/is-ndarray-like' );
var isReadOnly = require( './../../../base/assert/is-read-only' );
var zeroTo = require( '@stdlib/array/base/zero-to' );
var typedarray = require( '@stdlib/array/typed' );
var zeros = require( './../../../zeros' );
var numel = require( './../../../base/numel' );
var scalar2ndarray = require( './../../../base/from-scalar' );
var ndarray2array = require( './../../../to-array' );
var baseCtor = require( './../../../base/ctor' );
var ctor = require( './../../../ctor' );
var sliceFrom = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof sliceFrom, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function throws an error if the number of starting indices does not match the number of array dimensions (strict=false)', function test( t ) {
	var values;
	var start;
	var i;

	values = [
		zeros( [] ),
		zeros( [ 1 ] ),
		zeros( [ 1, 1 ] ),
		zeros( [ 1, 1, 1 ] ),
		zeros( [ 1, 1, 1, 1 ] )
	];
	start = [
		[ null ],
		[ null, null, null ],
		[ null ],
		[ null, null ],
		[ null, null, null ]
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValues( values[ i ], start[ i ] ), RangeError, 'throws an error when provided ' + start[ i ].toString() );
	}
	t.end();

	function badValues( x, s ) {
		return function badValues() {
			sliceFrom( x, s, false, false );
		};
	}
});

tape( 'the function throws an error if the number of starting indices does not match the number of array dimensions (strict=true)', function test( t ) {
	var values;
	var start;
	var i;

	values = [
		zeros( [] ),
		zeros( [ 1 ] ),
		zeros( [ 1, 1 ] ),
		zeros( [ 1, 1, 1 ] ),
		zeros( [ 1, 1, 1, 1 ] )
	];
	start = [
		[ null ],
		[ null, null, null ],
		[ null ],
		[ null, null ],
		[ null, null, null ]
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValues( values[ i ], start[ i ] ), RangeError, 'throws an error when provided ' + start[ i ].toString() );
	}
	t.end();

	function badValues( x, s ) {
		return function badValues() {
			sliceFrom( x, s, true, false );
		};
	}
});

tape( 'in strict mode, the function throws an error when a starting index exceeds array bounds', function test( t ) {
	var values;
	var start;
	var i;

	values = [
		zeros( [ 1 ] ),
		zeros( [ 1, 1 ] ),
		zeros( [ 1, 1, 1 ] ),
		zeros( [ 1, 1, 1, 1 ] )
	];

	start = [
		[ 10 ],
		[ null, 20 ],
		[ 20, null, null ],
		[ 20, 20, null, null ]
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValues( values[ i ], start[ i ] ), RangeError, 'throws an error when provided ' + start[ i ].toString() );
	}
	t.end();

	function badValues( x, s ) {
		return function badValues() {
			sliceFrom( x, s, true, false );
		};
	}
});

tape( 'in non-strict mode, the function returns an empty array when a starting index exceeds array bounds', function test( t ) {
	var actual;
	var values;
	var start;
	var i;

	values = [
		zeros( [ 1 ], { 'dtype': 'float64' } ),
		zeros( [ 1, 1 ], { 'dtype': 'float32' } ),
		zeros( [ 1, 1, 1 ], { 'dtype': 'int32' } ),
		zeros( [ 1, 1, 1, 1 ], { 'dtype': 'uint32' } ),
		zeros( [ 1, 1, 1, 1, 1 ], { 'dtype': 'complex128' } )
	];

	start = [
		[ 10 ],
		[ null, 20 ],
		[ 20, null, null ],
		[ 20, 20, null, null ],
		[ null, null, null, null, 10 ]
	];
	for ( i = 0; i < values.length; i++ ) {
		actual = sliceFrom( values[ i ], start[ i ], false, false );
		t.strictEqual( isndarrayLike( actual ), true, 'returns expected value' );
		t.strictEqual( numel( actual.shape ), 0, 'returns expected value' );
		t.strictEqual( actual.dtype, values[ i ].dtype, 'returns expected value' );
	}
	t.end();
});

tape( 'the function returns an empty array when a starting index is one more than the last index along a dimension', function test( t ) {
	var actual;
	var values;
	var start;
	var i;

	values = [
		zeros( [ 1 ], { 'dtype': 'float64' } ),
		zeros( [ 1, 1 ], { 'dtype': 'float32' } ),
		zeros( [ 1, 1, 1 ], { 'dtype': 'int32' } ),
		zeros( [ 1, 1, 1, 1 ], { 'dtype': 'uint32' } ),
		zeros( [ 1, 1, 1, 1, 1 ], { 'dtype': 'complex128' } )
	];

	start = [
		[ 1 ],
		[ null, 1 ],
		[ 1, null, null ],
		[ 1, 1, null, null ],
		[ null, null, null, null, 1 ]
	];
	for ( i = 0; i < values.length; i++ ) {
		actual = sliceFrom( values[ i ], start[ i ], false, false );
		t.strictEqual( isndarrayLike( actual ), true, 'returns expected value' );
		t.strictEqual( numel( actual.shape ), 0, 'returns expected value' );
		t.strictEqual( actual.dtype, values[ i ].dtype, 'returns expected value' );
	}
	t.end();
});

tape( 'when provided a zero-dimensional input array, the function returns a zero-dimensional array view (base)', function test( t ) {
	var actual;
	var x;
	var s;

	x = scalar2ndarray( 3.14, 'float64', 'row-major' );
	s = [];

	actual = sliceFrom( x, s, true, false );
	t.strictEqual( isndarrayLike( actual ), true, 'returns expected value' );
	t.strictEqual( actual.ndims, 0, 'returns expected value' );
	t.strictEqual( actual.dtype, x.dtype, 'returns expected value' );
	t.strictEqual( actual.get(), x.get(), 'returns expected value' );
	t.strictEqual( actual.data, x.data, 'returns expected value' );

	t.end();
});

tape( 'when provided a zero-dimensional input array, the function returns a zero-dimensional array view (base, offset)', function test( t ) {
	var actual;
	var x;
	var s;

	x = new baseCtor( 'float64', typedarray( zeroTo( 4 ), 'float64' ), [], [ 0 ], 3, 'row-major' );
	s = [];

	actual = sliceFrom( x, s, true, false );
	t.strictEqual( isndarrayLike( actual ), true, 'returns expected value' );
	t.strictEqual( actual.ndims, 0, 'returns expected value' );
	t.strictEqual( actual.dtype, x.dtype, 'returns expected value' );
	t.strictEqual( actual.get(), 3, 'returns expected value' );
	t.strictEqual( actual.data, x.data, 'returns expected value' );

	t.end();
});

tape( 'when provided a zero-dimensional input array, the function returns a zero-dimensional array view (non-base, offset, read-only)', function test( t ) {
	var actual;
	var x;
	var s;

	x = new ctor( 'float64', typedarray( zeroTo( 4 ), 'float64' ), [], [ 0 ], 3, 'row-major' );
	s = [];

	actual = sliceFrom( x, s, true, false );
	t.strictEqual( isndarrayLike( actual ), true, 'returns expected value' );
	t.strictEqual( actual.ndims, 0, 'returns expected value' );
	t.strictEqual( actual.dtype, x.dtype, 'returns expected value' );
	t.strictEqual( actual.get(), 3, 'returns expected value' );
	t.strictEqual( actual.data, x.data, 'returns expected value' );
	t.strictEqual( isReadOnly( actual ), true, 'returns expected value' );

	t.end();
});

tape( 'when provided a zero-dimensional input array, the function returns a zero-dimensional array view (non-base, offset, writable)', function test( t ) {
	var actual;
	var x;
	var s;

	x = new ctor( 'float64', typedarray( zeroTo( 4 ), 'float64' ), [], [ 0 ], 3, 'row-major' );
	s = [];

	actual = sliceFrom( x, s, true, true );
	t.strictEqual( isndarrayLike( actual ), true, 'returns expected value' );
	t.strictEqual( actual.ndims, 0, 'returns expected value' );
	t.strictEqual( actual.dtype, x.dtype, 'returns expected value' );
	t.strictEqual( actual.get(), 3, 'returns expected value' );
	t.strictEqual( actual.data, x.data, 'returns expected value' );
	t.strictEqual( isReadOnly( actual ), false, 'returns expected value' );

	t.end();
});

tape( 'the function returns a shifted view of a provided input array (ndims=1)', function test( t ) {
	var expected;
	var actual;
	var buf;
	var ord;
	var sh;
	var st;
	var o;
	var x;
	var s;
	var i;

	buf = typedarray( zeroTo( 30 ), 'float64' );
	sh = [ 6 ];
	st = [ 2 ];
	o = 4;
	ord = 'row-major';

	x = new ctor( 'float64', buf, sh, st, o, ord );

	s = [ null ];
	actual = sliceFrom( x, s, true, false );

	t.strictEqual( isndarrayLike( actual ), true, 'returns expected value' );
	t.strictEqual( actual.ndims, 1, 'returns expected value' );
	t.strictEqual( actual.length, 6, 'returns expected value' );
	t.strictEqual( actual.dtype, x.dtype, 'returns expected value' );
	t.strictEqual( actual.data, x.data, 'returns expected value' );

	expected = [ 4, 6, 8, 10, 12, 14 ];
	for ( i = 0; i < expected.length; i++ ) {
		t.strictEqual( actual.iget( i ), expected[ i ], 'returns expected value' );
	}

	s = [ void 0 ];
	actual = sliceFrom( x, s, true, false );

	t.strictEqual( isndarrayLike( actual ), true, 'returns expected value' );
	t.strictEqual( actual.ndims, 1, 'returns expected value' );
	t.strictEqual( actual.length, 6, 'returns expected value' );
	t.strictEqual( actual.dtype, x.dtype, 'returns expected value' );
	t.strictEqual( actual.data, x.data, 'returns expected value' );

	expected = [ 4, 6, 8, 10, 12, 14 ];
	for ( i = 0; i < expected.length; i++ ) {
		t.strictEqual( actual.iget( i ), expected[ i ], 'returns expected value' );
	}

	s = [ 0 ];
	actual = sliceFrom( x, s, true, false );

	t.strictEqual( isndarrayLike( actual ), true, 'returns expected value' );
	t.strictEqual( actual.ndims, 1, 'returns expected value' );
	t.strictEqual( actual.length, 6, 'returns expected value' );
	t.strictEqual( actual.dtype, x.dtype, 'returns expected value' );
	t.strictEqual( actual.data, x.data, 'returns expected value' );

	expected = [ 4, 6, 8, 10, 12, 14 ];
	for ( i = 0; i < expected.length; i++ ) {
		t.strictEqual( actual.iget( i ), expected[ i ], 'returns expected value' );
	}

	s = [ 2 ];
	actual = sliceFrom( x, s, true, false );

	t.strictEqual( isndarrayLike( actual ), true, 'returns expected value' );
	t.strictEqual( actual.ndims, 1, 'returns expected value' );
	t.strictEqual( actual.length, 4, 'returns expected value' );
	t.strictEqual( actual.dtype, x.dtype, 'returns expected value' );
	t.strictEqual( actual.data, x.data, 'returns expected value' );

	expected = [ 8, 10, 12, 14 ];
	for ( i = 0; i < expected.length; i++ ) {
		t.strictEqual( actual.iget( i ), expected[ i ], 'returns expected value' );
	}

	s = [ -4 ];
	actual = sliceFrom( x, s, true, false );

	t.strictEqual( isndarrayLike( actual ), true, 'returns expected value' );
	t.strictEqual( actual.ndims, 1, 'returns expected value' );
	t.strictEqual( actual.length, 4, 'returns expected value' );
	t.strictEqual( actual.dtype, x.dtype, 'returns expected value' );
	t.strictEqual( actual.data, x.data, 'returns expected value' );

	expected = [ 8, 10, 12, 14 ];
	for ( i = 0; i < expected.length; i++ ) {
		t.strictEqual( actual.iget( i ), expected[ i ], 'returns expected value' );
	}
	t.end();
});

tape( 'the function returns a shifted view of a provided input array (ndims=2)', function test( t ) {
	var expected;
	var actual;
	var buf;
	var ord;
	var sh;
	var st;
	var o;
	var x;
	var s;

	buf = typedarray( zeroTo( 30 ), 'float64' );
	sh = [ 4, 3 ];
	st = [ 6, 2 ];
	o = 4;
	ord = 'row-major';

	x = new ctor( 'float64', buf, sh, st, o, ord );

	s = [ null, null ];
	actual = sliceFrom( x, s, true, false );

	t.strictEqual( isndarrayLike( actual ), true, 'returns expected value' );
	t.strictEqual( actual.ndims, 2, 'returns expected value' );
	t.deepEqual( actual.shape, [ 4, 3 ], 'returns expected value' );
	t.strictEqual( actual.dtype, x.dtype, 'returns expected value' );
	t.strictEqual( actual.data, x.data, 'returns expected value' );

	expected = [
		[ 4, 6, 8 ],
		[ 10, 12, 14 ],
		[ 16, 18, 20 ],
		[ 22, 24, 26 ]
	];
	actual = ndarray2array( actual );
	t.deepEqual( actual, expected, 'returns expected value' );

	s = [ void 0, void 0 ];
	actual = sliceFrom( x, s, true, false );

	t.strictEqual( isndarrayLike( actual ), true, 'returns expected value' );
	t.strictEqual( actual.ndims, 2, 'returns expected value' );
	t.deepEqual( actual.shape, [ 4, 3 ], 'returns expected value' );
	t.strictEqual( actual.dtype, x.dtype, 'returns expected value' );
	t.strictEqual( actual.data, x.data, 'returns expected value' );

	expected = [
		[ 4, 6, 8 ],
		[ 10, 12, 14 ],
		[ 16, 18, 20 ],
		[ 22, 24, 26 ]
	];
	actual = ndarray2array( actual );

	s = [ 0, 0 ];
	actual = sliceFrom( x, s, true, false );

	t.strictEqual( isndarrayLike( actual ), true, 'returns expected value' );
	t.strictEqual( actual.ndims, 2, 'returns expected value' );
	t.deepEqual( actual.shape, [ 4, 3 ], 'returns expected value' );
	t.strictEqual( actual.dtype, x.dtype, 'returns expected value' );
	t.strictEqual( actual.data, x.data, 'returns expected value' );

	expected = [
		[ 4, 6, 8 ],
		[ 10, 12, 14 ],
		[ 16, 18, 20 ],
		[ 22, 24, 26 ]
	];
	actual = ndarray2array( actual );
	t.deepEqual( actual, expected, 'returns expected value' );
	t.deepEqual( actual, expected, 'returns expected value' );

	s = [ 2, null ];
	actual = sliceFrom( x, s, true, false );

	t.strictEqual( isndarrayLike( actual ), true, 'returns expected value' );
	t.strictEqual( actual.ndims, 2, 'returns expected value' );
	t.deepEqual( actual.shape, [ 2, 3 ], 'returns expected value' );
	t.strictEqual( actual.dtype, x.dtype, 'returns expected value' );
	t.strictEqual( actual.data, x.data, 'returns expected value' );

	expected = [
		[ 16, 18, 20 ],
		[ 22, 24, 26 ]
	];
	actual = ndarray2array( actual );
	t.deepEqual( actual, expected, 'returns expected value' );

	s = [ null, 1 ];
	actual = sliceFrom( x, s, true, false );

	t.strictEqual( isndarrayLike( actual ), true, 'returns expected value' );
	t.strictEqual( actual.ndims, 2, 'returns expected value' );
	t.deepEqual( actual.shape, [ 4, 2 ], 'returns expected value' );
	t.strictEqual( actual.dtype, x.dtype, 'returns expected value' );
	t.strictEqual( actual.data, x.data, 'returns expected value' );

	expected = [
		[ 6, 8 ],
		[ 12, 14 ],
		[ 18, 20 ],
		[ 24, 26 ]
	];
	actual = ndarray2array( actual );
	t.deepEqual( actual, expected, 'returns expected value' );

	s = [ 1, 1 ];
	actual = sliceFrom( x, s, true, false );

	t.strictEqual( isndarrayLike( actual ), true, 'returns expected value' );
	t.strictEqual( actual.ndims, 2, 'returns expected value' );
	t.deepEqual( actual.shape, [ 3, 2 ], 'returns expected value' );
	t.strictEqual( actual.dtype, x.dtype, 'returns expected value' );
	t.strictEqual( actual.data, x.data, 'returns expected value' );

	expected = [
		[ 12, 14 ],
		[ 18, 20 ],
		[ 24, 26 ]
	];
	actual = ndarray2array( actual );
	t.deepEqual( actual, expected, 'returns expected value' );
	t.end();
});

tape( 'the function returns a shifted view of a provided input array (ndims=3)', function test( t ) {
	var expected;
	var actual;
	var buf;
	var ord;
	var sh;
	var st;
	var o;
	var x;
	var s;

	buf = typedarray( zeroTo( 100 ), 'float64' );
	sh = [ 2, 4, 3 ];
	st = [ 24, 6, 2 ];
	o = 10;
	ord = 'row-major';

	x = new ctor( 'float64', buf, sh, st, o, ord );

	s = [ null, null, null ];
	actual = sliceFrom( x, s, true, false );

	t.strictEqual( isndarrayLike( actual ), true, 'returns expected value' );
	t.strictEqual( actual.ndims, 3, 'returns expected value' );
	t.deepEqual( actual.shape, [ 2, 4, 3 ], 'returns expected value' );
	t.strictEqual( actual.dtype, x.dtype, 'returns expected value' );
	t.strictEqual( actual.data, x.data, 'returns expected value' );

	expected = [
		[
			[ 10, 12, 14 ],
			[ 16, 18, 20 ],
			[ 22, 24, 26 ],
			[ 28, 30, 32 ]
		],
		[
			[ 34, 36, 38 ],
			[ 40, 42, 44 ],
			[ 46, 48, 50 ],
			[ 52, 54, 56 ]
		]
	];
	actual = ndarray2array( actual );
	t.deepEqual( actual, expected, 'returns expected value' );

	s = [ 1, null, null ];
	actual = sliceFrom( x, s, true, false );

	t.strictEqual( isndarrayLike( actual ), true, 'returns expected value' );
	t.strictEqual( actual.ndims, 3, 'returns expected value' );
	t.deepEqual( actual.shape, [ 1, 4, 3 ], 'returns expected value' );
	t.strictEqual( actual.dtype, x.dtype, 'returns expected value' );
	t.strictEqual( actual.data, x.data, 'returns expected value' );

	expected = [
		[
			[ 34, 36, 38 ],
			[ 40, 42, 44 ],
			[ 46, 48, 50 ],
			[ 52, 54, 56 ]
		]
	];
	actual = ndarray2array( actual );
	t.deepEqual( actual, expected, 'returns expected value' );

	s = [ null, 1, null ];
	actual = sliceFrom( x, s, true, false );

	t.strictEqual( isndarrayLike( actual ), true, 'returns expected value' );
	t.strictEqual( actual.ndims, 3, 'returns expected value' );
	t.deepEqual( actual.shape, [ 2, 3, 3 ], 'returns expected value' );
	t.strictEqual( actual.dtype, x.dtype, 'returns expected value' );
	t.strictEqual( actual.data, x.data, 'returns expected value' );

	expected = [
		[
			[ 16, 18, 20 ],
			[ 22, 24, 26 ],
			[ 28, 30, 32 ]
		],
		[
			[ 40, 42, 44 ],
			[ 46, 48, 50 ],
			[ 52, 54, 56 ]
		]
	];
	actual = ndarray2array( actual );
	t.deepEqual( actual, expected, 'returns expected value' );

	s = [ null, null, 2 ];
	actual = sliceFrom( x, s, true, false );

	t.strictEqual( isndarrayLike( actual ), true, 'returns expected value' );
	t.strictEqual( actual.ndims, 3, 'returns expected value' );
	t.deepEqual( actual.shape, [ 2, 4, 1 ], 'returns expected value' );
	t.strictEqual( actual.dtype, x.dtype, 'returns expected value' );
	t.strictEqual( actual.data, x.data, 'returns expected value' );

	expected = [
		[
			[ 14 ],
			[ 20 ],
			[ 26 ],
			[ 32 ]
		],
		[
			[ 38 ],
			[ 44 ],
			[ 50 ],
			[ 56 ]
		]
	];
	actual = ndarray2array( actual );
	t.deepEqual( actual, expected, 'returns expected value' );

	s = [ 1, -2, 2 ];
	actual = sliceFrom( x, s, true, false );

	t.strictEqual( isndarrayLike( actual ), true, 'returns expected value' );
	t.strictEqual( actual.ndims, 3, 'returns expected value' );
	t.deepEqual( actual.shape, [ 1, 2, 1 ], 'returns expected value' );
	t.strictEqual( actual.dtype, x.dtype, 'returns expected value' );
	t.strictEqual( actual.data, x.data, 'returns expected value' );

	expected = [
		[
			[ 50 ],
			[ 56 ]
		]
	];
	actual = ndarray2array( actual );
	t.deepEqual( actual, expected, 'returns expected value' );
	t.end();
});
