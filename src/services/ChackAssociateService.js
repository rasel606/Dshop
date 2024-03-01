

const ChackAssociateService = async (QueryObject, AssociateModel) => {

    try {

        // console.log(QueryObject)
        let data = await AssociateModel?.aggregate([
            { $match: QueryObject }
        ])
        // console.log(data)

        return data?.length > 0
    } catch (error) {
        return false
    }
};
module.exports = ChackAssociateService
