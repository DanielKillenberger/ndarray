/*
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
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

import dtypeDesc = require( './index' );


// TESTS //

// The function returns a table if not provided a data type string...
{
	dtypeDesc(); // $ExpectType Table
}

// The function returns string or null if provided a data type string...
{
	dtypeDesc( 'float64' ); // $ExpectType string | null
	dtypeDesc( 'generic' ); // $ExpectType string | null
}

// The function does not compile if provided a value other than a string...
{
	dtypeDesc( true ); // $ExpectError
	dtypeDesc( false ); // $ExpectError
	dtypeDesc( null ); // $ExpectError
	dtypeDesc( undefined ); // $ExpectError
	dtypeDesc( 5 ); // $ExpectError
	dtypeDesc( [] ); // $ExpectError
	dtypeDesc( {} ); // $ExpectError
	dtypeDesc( ( x: number ): number => x ); // $ExpectError
}
