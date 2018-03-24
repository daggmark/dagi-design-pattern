
function listElements(obj){
     for (const key in obj) {
            const element = obj[key];
            console.log(element);

        }
}
module.exports = {
     listElements:listElements
};