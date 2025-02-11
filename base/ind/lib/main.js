/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

'use strict';

// MODULES //

var clampIndex = require( './../../../base/clamp-index' );
var wrapIndex = require( './../../../base/wrap-index' );
var format = require( '@stdlib/string/format' );


// MAIN //

/**
* Returns an index given an index mode.
*
* @param {integer} idx - index
* @param {NonNegativeInteger} max - maximum index
* @param {string} mode - specifies how to handle an index outside the interval `[0,max]`
* @throws {RangeError} index out-of-bounds
* @returns {integer} index
*
* @example
* var idx = ind( 2, 9, 'clamp' );
* // returns 2
*
* idx = ind( 10, 9, 'clamp' );
* // returns 9
*
* idx = ind( -1, 9, 'clamp' );
* // returns 0
*
* @example
* var idx = ind( 2, 9, 'wrap' );
* // returns 2
*
* idx = ind( 10, 9, 'wrap' );
* // returns 0
*
* idx = ind( -1, 9, 'wrap' );
* // returns 9
*
* @example
* var idx = ind( 2, 9, 'throw' );
* // returns 2
*
* idx = ind( 10, 9, 'throw' );
* // throws <RangeError>
*
* idx = ind( -1, 9, 'throw' );
* // throws <RangeError>
*/
function ind( idx, max, mode ) {
	if ( mode === 'clamp' ) {
		return clampIndex( idx, max );
	}
	if ( mode === 'wrap' ) {
		return wrapIndex( idx, max );
	}
	if ( idx < 0 || idx > max ) {
		throw new RangeError( format( 'invalid argument. Index must be on the interval: [0, %d]. Value: `%d`.', max, idx ) );
	}
	return idx;
}


// EXPORTS //

module.exports = ind;
