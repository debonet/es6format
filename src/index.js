module.exports = (sfmt, ...vxIn) => {
 	const aArgs = vxIn.reduce(
		( a, x ) => {
			return ( typeof( x ) == 'object' && !Array.isArray( x ))
				? {...a,...x}
			: a;
		},
		vxIn.reduce(
			(a,x,n) => { a[`arg${n}`] = x; return a; },
			{})
	);
	
	aArgs.args = vxIn;

	return  Function(
		Object.keys(aArgs),
		`return \`${sfmt.replace(/\${([\d])}/g, '${arg$1}')}\``
	)( ...Object.values(aArgs) );
}

module.exports.bindTo = ( cls, sf = 'f' ) => {
	cls.prototype[sf] = function(...vx){
		return module.exports.call( null, this, ...vx );
	}
}
