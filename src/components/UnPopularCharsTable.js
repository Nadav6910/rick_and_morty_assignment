import { useState, useEffect } from "react"
import axios from "axios"
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function UnPopularCharsTable() {

    // rows state
    const [rows, setRows] = useState([])

    useEffect(() => {

        // creating a controller
        const controller = new AbortController()

        const C137Chars = []

        // getting all locations with needed dimension
        axios.get(`https://rickandmortyapi.com/api/location/?dimension=Dimension C-137&name=Earth (C-137)`)
        
        .then(res => {

            res.data.results[0].residents.forEach(resident => {
                C137Chars.push(resident.split("/")[resident.split("/").length - 1])
            })

            // getting all chars that exists in those locations
            axios.get(`https://rickandmortyapi.com/api/character/${C137Chars}`)

            .then(res => {

                // making sure rows array is empy on render
                setRows([])

                // go over chars and create rows for chars that fit requirements
                res.data.forEach(char => {
                    if (char.episode.length <= 1) {
                        setRows((prevRows) => [
                            ...prevRows,
                            createData(char.name, char.origin.name, char.origin.name.split(" ")[0], char.episode.length)
                        ])
                    } 
                })
            })
        })

        

        // prevent any memmory leaks on queries to api
        return () => {
            controller.abort() 
        }

    }, [])

    //mui table styling
    const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#5cae4a",
        color: "white"
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
    }))

    //function for creating the row
    function createData(charName, originName, dimension, poplurity) {
        return { charName, originName, dimension, poplurity }
    }

  return (

    <div className="table-container">
        <h1 className="table-header">The Most unpopular characters from Earth C-137</h1>
        <TableContainer sx={{marginTop: "0.5em", width: "90%"}} component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>Character name</StyledTableCell>
                <StyledTableCell align="center">Origin name</StyledTableCell>
                <StyledTableCell align="center">Origin dimension</StyledTableCell>
                <StyledTableCell align="center">Poplurity(Episodes)</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {/* looping over rows created from data to form the table  */}
            {rows.map((row) => (
                <TableRow key={row.charName}>
                <TableCell component="th" scope="row">
                    {row.charName}
                </TableCell>
                <TableCell align="center">{row.dimension}</TableCell>
                <TableCell align="center">{row.originName}</TableCell>
                <TableCell align="center">{row.poplurity}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
  )
}
