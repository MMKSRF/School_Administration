// ProgressChart.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import * as d3 from 'd3';

const ProgressChart = ({ data }) => {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  
  useEffect(() => {
    if (!data || data.length === 0) return;
    
    // Clear previous SVG
    d3.select(svgRef.current).selectAll("*").remove();
    
    // Set up dimensions
    const width = svgRef.current.clientWidth;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Create scales
    const xScale = d3.scalePoint()
      .domain(data.map((_, i) => i + 1))
      .range([0, innerWidth]);
    
    const yScale = d3.scaleLinear()
      .domain([d3.min(data) - 5, d3.max(data) + 5])
      .range([innerHeight, 0]);
    
    // Create line generator
    const line = d3.line()
      .x((d, i) => xScale(i + 1))
      .y(d => yScale(d))
      .curve(d3.curveMonotoneX);
    
    // Add X axis
    svg.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale).tickFormat(d => `Week ${d}`));
    
    // Add Y axis
    svg.append("g")
      .call(d3.axisLeft(yScale).tickFormat(d => `${d}%`));
    
    // Add grid lines
    svg.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickFormat("")
      );
    
    // Draw the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#4F46E5")
      .attr("stroke-width", 3)
      .attr("d", line);
    
    // Draw data points
    svg.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", (d, i) => xScale(i + 1))
      .attr("cy", d => yScale(d))
      .attr("r", 5)
      .attr("fill", "#4F46E5")
      .on("mouseover", (event, d) => {
        // Show tooltip
        gsap.to(tooltipRef.current, {
          opacity: 1,
          duration: 0.2
        });
        
        tooltipRef.current.innerHTML = `
          <div class="font-bold">Score: ${d}%</div>
          <div>Week ${data.indexOf(d) + 1}</div>
        `;
      })
      .on("mousemove", (event) => {
        // Position tooltip
        tooltipRef.current.style.left = `${event.pageX + 10}px`;
        tooltipRef.current.style.top = `${event.pageY - 30}px`;
      })
      .on("mouseout", () => {
        // Hide tooltip
        gsap.to(tooltipRef.current, {
          opacity: 0,
          duration: 0.2
        });
      });
    
    // Add trend label
    const trendDirection = data[data.length - 1] > data[0] ? "up" : "down";
    const trendColor = trendDirection === "up" ? "text-green-600" : "text-red-600";
    const trendIcon = trendDirection === "up" ? "↑" : "↓";
    const trendPercent = Math.abs(Math.round(((data[data.length - 1] - data[0]) / data[0] * 100)));
    
    svg.append("text")
      .attr("x", innerWidth - 10)
      .attr("y", 20)
      .attr("text-anchor", "end")
      .attr("class", "text-sm font-bold")
      .text(`Trend: ${trendIcon} ${trendPercent}%`)
      .style("fill", trendDirection === "up" ? "#10B981" : "#EF4444");
    
    // Animate chart
    const path = svg.select("path");
    const totalLength = path.node().getTotalLength();
    
    path
      .attr("stroke-dasharray", totalLength)
      .attr("stroke-dashoffset", totalLength);
    
    gsap.to(path.node(), {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power2.out"
    });
    
    gsap.from(svg.selectAll(".dot").nodes(), {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      delay: 1,
      ease: "elastic.out(1, 0.5)"
    });
    
  }, [data]);

  return (
    <div className="relative">
      <div 
        ref={tooltipRef}
        className="absolute bg-white shadow-lg rounded-lg p-3 text-sm opacity-0 pointer-events-none z-10 min-w-[120px] border border-gray-200"
      ></div>
      <svg ref={svgRef} className="w-full" height="300"></svg>
    </div>
  );
};

export default ProgressChart;