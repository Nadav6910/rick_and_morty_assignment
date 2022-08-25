import React from "react"

export default function Chart({data, width, height, barWidth, barMargin}) {
    
    return (
        <svg
            className="bar-chart"
            viewBox={`0 0 ${width} ${height}`}
            width="100%"
            height="70%"
            preserveAspectRatio="xMidYMax meet"
        >
            {/* looping over data to create dynamic bars for the chart */}
            {data.map((char, index) => {

                // setting the bar height basic on the char number of episodes
                const barHeight = char.popularity

                return <React.Fragment key={char.name}> 
                        <rect 
                        className={`${char?.name}-rect`} 
                        key={char?.name} 
                        x={index * (barWidth + barMargin) + 10} 
                        y={height - barHeight} 
                        width="50" 
                        height={char?.popularity} />

                        <text 
                        className="bar-number"
                        x={index * (barWidth + barMargin) + 25}
                        y={height - barHeight - 5}
                        >
                            {char.popularity}
                        </text>
                        
                        <text 
                        className="bar-text"
                        x={char.name === "Summer Smith" ? index * (barWidth + barMargin) + 17 : index * (barWidth + barMargin) + 19}
                        y={height - barHeight + barHeight / 2}
                        >
                            {char.name}
                        </text>
                    </React.Fragment>
            })}
        </svg>
    )
}