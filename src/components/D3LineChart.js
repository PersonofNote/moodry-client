import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';
import { moodColors } from '../constants'
import '../styles/line-chart.css';
import { useWindowSize } from '../hooks/UseWindowSize';

const parseDate = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ");

const getDates = (data) => {
    return data.map(d => parseDate(d.createdAt))
}

const D3LineChart = ({data, dateRange}) => {
    const { wHeight, wWidth } = useWindowSize();
    const ticks = []
    const d3Container = useRef(null);
    const now = new Date();

    // TODO: convert these to config options
    const margin = wWidth < 750 ? {top: 10, right: 30, bottom: 30, left: 30} : {top: 10, right: 30, bottom: 30, left: 60};
    //width = 800 - margin.left - margin.right,
    //height = 200 - margin.top - margin.bottom;
    const width = wWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const tooltipContent = (val) => {
        const date = parseDate(val.createdAt)
        const formatDate = d3.timeFormat('%d-%m-%y at %H:%m')
        const note = val.note || 'NO NOTE DATA'
        return (
        `   
            <div>Date: ${formatDate(date)}</div>
            <div> Note: ${note}</div>
        `
        )
    }
    
    const Tooltip = d3.select("#tooltip")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")

    const mouseover = (d) => {
        Tooltip
            .style("opacity", 0.8)
            .style("stroke", "black")
            .style('color', 'black')
        }
    
    const mousemove = (d, value) => {
        Tooltip
            .html(tooltipContent(value))
            .style("left", (d.offsetX + "px"))
            .style("top", (d.offsetY+ "px"))
        }
    
    const mouseleave = (d) => {
        Tooltip
            .style("opacity", 0)
        }

    useEffect(() => {
            if (data && d3Container.current) {
                // TODO: right nwo this won't dynamically update. How to recalculate without redrawing everything forever?
                // Will need to modularize this function quite a bit so we can remove/redraw only the parts we want.
                // Will probably need to make full-on react components out of some of them.
                const tickNum = wWidth < 750 ? 3 : 10;
                const fontSize = wWidth < 750 ? 25 : 10;
                const dotSize = wWidth < 750 ? 15 : 5;

                d3.select('#line-chart-svg').selectAll('*').remove();
                
                const domain = dateRange.startDate != null ? [dateRange.startDate, d3.isoParse(dateRange.endDate)] : d3.extent(getDates(data))
                
                const xScale = d3.scaleTime()
                    .domain(domain)
                    .range([0, width])

                const yScale = d3.scaleLinear()
                //.domain([0, d3.max(data, d => +d.value )])
                .domain([0,3])
                .range([ height, 0 ])

                // attach chart svg
                const svg = d3.select(d3Container.current)
                .append("svg")
                    .attr('id', 'line-chart')
                    // .attr("width", width + margin.left + margin.right)
                    // .attr("height", height + margin.top + margin.bottom)
                    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
                .append("g")
                    .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");

                var x = d3.scaleTime()
                .domain(domain)
                .range([ 0, width ])

                const xAxis = d3.axisBottom(xScale).ticks(tickNum)

                svg.append("g")
                .attr('id', 'x-axis')
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);


               
                // Add Y axis
                var y = d3.scaleLinear()
                .domain([0, d3.max(data, d => +d.value )])
                .range([ height, 0 ])

                svg.append("g")
                .call(d3.axisLeft(y).ticks(3));   

                /* GRADIENT STUFF: Needs math 
                var defs = svg.append('defs');
                
                var gradient = defs.append('linearGradient')
                    .attr('id', 'svgGradient')
                    .attr('x2', '0%')
                    .attr('x2', '100%')
                    .attr('y1', '0%')
                    .attr('y2', '100%');


                for (const d in data) {
                    const index = Number(d);
                    const nextValue = index < data.length ? index + 1 : data.length;

                    gradient.append('stop')
                    .attr('class', 'start')
                    .attr('offset', '0%') // Need math to spread this out
                    .attr('stop-color', moodColors[data[index].value])
                    .attr('stop-opacity', 1);
        
                    gradient.append('stop')
                    .attr('class', 'end')
                    .attr('offset', '100%')
                    .attr('stop-color', moodColors[nextValue])
                    .attr('stop-opacity', 1);
                }
                */
                
                // add line
                svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", 'aliceblue')
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                .x((d) => xScale(parseDate(d.createdAt))) 
                .y((d) => yScale(d.value)) 
                )
            
                // add dots
                svg.append('g')
                svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("r", dotSize)
                .attr("fill", (d) => moodColors[d.value])
                .attr("cx", (d) => xScale(parseDate(d.createdAt)))
                .attr("cy", (d) => yScale(d.value))
                .on("mouseover", mouseover)
                .on("mousemove", mousemove)
                .on("mouseleave", mouseleave)

                d3.selectAll('text').attr('font-size', fontSize);
            }

        },[data, d3Container.current])

    return (
            <div className='line-chart-container'>
                <svg
                    id="line-chart-svg"
                    className="d3-line-chart"
                    width='100%'
                    height='100%'
                    ref={d3Container}
                />
                <div id='tooltip'></div>
            </div>
    );
}

export default D3LineChart;