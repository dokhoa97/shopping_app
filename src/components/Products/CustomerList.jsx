function CustomerList() {
    return (
        <table className="table table-bordered table-striped table-hover rounded-3 overflow-hidden">
            <thead className="table-secondary">
                <tr>
                    <th className="text-center">#ID</th>
                    <th className="text-center">Fullname</th>
                    <th className="text-center">Email</th>
                    <th className="text-center">Order Date</th>
                    <th className="text-center">Total Amount</th>
                    <th className="text-center">Action</th>
                </tr>
            </thead>
            <tbody>
                <td className="text-center ">1</td>
                <td className="text-center ">Do Dang KHoa</td>
                <td className="text-center ">123@gmail.com</td>
                <td className="text-center ">jsut</td>
                <td className="text-center ">10000</td>
                <td className="text-center ">;;;</td>
            </tbody>
        </table>
    )
}
export default CustomerList