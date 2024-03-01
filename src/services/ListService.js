


const ListService = async (Requst, dataModel, SearchArray) => {

    try {

        let pageNo = Number(Requst.params.pageNo)
        let parPage = Number(Requst.params.parPage)

        let searchValue = Requst.params?.searchKeyword
        let skipRow = (pageNo - 1) * parPage

        let data
        if (searchValue == 0) {
            console.log(pageNo, parPage, searchValue)
            data = await dataModel.aggregate([{

                $facet: {
                    Total: [{ $count: "count" }],
                    row: [{ $skip: skipRow }, { $limit: parPage }]
                }
            }])

        }
        else {

            console.log(pageNo, parPage, searchValue, "line 1")
            let searchQuary = { $or: SearchArray }
            data = await dataModel.aggregate([{
                $facet: {
                    Total: [{ $match: searchQuary }, { $count: "count" }],
                    row: [{ $match: searchQuary }, { $skip: skipRow }, { $limit: parPage }]
                }
            }])



        }

        return { status: "success", data }

    } catch (error) {
        return { status: "fail", data: error.toString() }
    }


};
module.exports = ListService;
