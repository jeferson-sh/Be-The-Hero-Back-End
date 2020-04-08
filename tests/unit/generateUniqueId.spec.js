const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generated Unique Id',()=>{
    it('shold generate an unique id', ()=>{
        const id = generateUniqueId();
        expect(id).toHaveLength(8);
    });
});