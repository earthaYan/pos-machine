const baseUrl="http://rap2.taobao.org:38080/app/mock/266904/"
function getApi(){
    return{
        getOftenGoods:`${baseUrl}oftenGoods`,
        getType:`${baseUrl}typeGoods`,
    }
}
export default getApi