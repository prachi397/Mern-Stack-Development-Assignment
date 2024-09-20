import react, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    CircularProgress,
    Table, TableBody,
    TableCell, TableRow,
    TableContainer, TableHead,
    Snackbar,
    Alert
} from "@mui/material";

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState(false);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const url = 'http://localhost:3000/users';
            const response = await axios.get(url);
            setUsers(response.data);
            setLoading(false);
            setSnackbar(true);
        } catch (err) {
            console.log("Error in fetching user data");
            setLoading(false);
        }
    }

    //show the loader untill the data is loaded
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    //fucntion to close the snackbar
    const handleCloseSnackbar = () => {
        setSnackbar(false);
    };

    return (
        <div>
            <Snackbar
                open={snackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success">
                    Users data fetched successfully!
                </Alert>
            </Snackbar>
            <TableContainer>
                <h1>User List</h1>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>ID</strong></TableCell>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Email</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
export default UserTable;