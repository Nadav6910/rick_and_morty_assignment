import { useState, useEffect } from "react"
import axios from "axios"
import "../styles/index.css"
import Chart from "./Chart"

export default function BarChart() {

    // chart data
    const [data, setData] = useState([])

    useEffect(() => {

        // creating a controller
        const controller = new AbortController()

        //getting data of all characters from api by creating a range of the sum of chars in query
        axios.get("https://rickandmortyapi.com/api/character/[1, 2, 3, 4, 5]")
        
        .then(res => {
            console.log(res.data);
            // making sure data array is empy on render
            setData([])

            // go over chars and create a object containing char name and number of episodes
            res.data.forEach(char => {
                const name = char.name
                const popularity = char.episode.length
                const image = char.image

                setData((prevRows) => [...prevRows, {name, popularity, image}])
            })
        })

        // prevent any memmory leaks on queries to api
        return () => {
            controller.abort() 
        }

    }, [])

    // chart config
    const chartHeight = 120
    const barWidth = 50
    const barMargin = 20
    const numberOfBars = 5
    const width = numberOfBars * (barWidth + barMargin)

    
    return (
        <div className="chart-wrapper">
            <h1 className="chart-header">Popularity Chart Of The Show's Main Characters</h1> 
            <div className="legend">
                {/* looping over data to create dynamic legend */}
                {data.map(char => {
                    return <span key={char.name} className="image-container">
                        <img className="char-image" src={char.image} alt="char-img"/><div className={char.name}/>
                    </span>
                })}
            </div>
            {/* the component of the chart itself  */}
            <Chart data={data} width={width} height={chartHeight} barWidth={barWidth} barMargin={barMargin} />
        </div>
    )
}