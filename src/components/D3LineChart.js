import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';
import { moodColors } from '../constants'
import '../styles/line-chart.css';

const parseDate = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ");

const getDates = (data) => {
    return data.map(d => parseDate(d.createdAt))
}

const D3LineChart = ({data, dateRange}) => {
    console.log(dateRange)
    // TODO: select the ticks based on the time interval (possibly handled up higher)
    // TODO: calculate ticks from the date interval, not the dates themselves (except for 'all'. So like one week/one month, etc)
    const ticks = []
    const d3Container = useRef(null);
    const now = new Date();

    // TODO: convert these to config options
    const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 800 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

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
                
                d3.select('#line-chart-svg').selectAll('*').remove();
                
                const domain = dateRange.startDate != null ? [dateRange.startDate, d3.isoParse(dateRange.endDate)] : d3.extent(getDates(data))
                const xScale = d3.scaleTime()
                    .domain(domain)
                    .range([0, width])
                    .nice();
                const yScale = d3.scaleLinear()
                .domain([0, d3.max(data, d => +d.value )])
                .range([ height, 0 ])

                // attach chart svg
                const svg = d3.select(d3Container.current)
                .append("svg")
                    .attr('id', 'line-chart')
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                .append("g")
                    .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");

                var x = d3.scaleTime()
                .domain(domain)
                .range([ 0, width ]);

                svg.append("g")
                .attr('id', 'x-axis')
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

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
                .attr("r", 5)
                .attr("fill", (d) => moodColors[d.value])
                .attr("cx", (d) => xScale(parseDate(d.createdAt)))
                .attr("cy", (d) => yScale(d.value))
                .on("mouseover", mouseover)
                .on("mousemove", mousemove)
                .on("mouseleave", mouseleave)

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