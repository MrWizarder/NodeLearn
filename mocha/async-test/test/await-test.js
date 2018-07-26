
const assert = require('assert');
// const sum = require('../hello');

        it('#async function', async () => {
            let r = await hello();
            assert.strictEqual(r, 15);
        });
