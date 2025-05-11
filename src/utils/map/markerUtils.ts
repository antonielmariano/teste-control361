import type { LocationVehicle } from '../../types/vehicle';

export const createCustomMarkerElement = (vehicle: LocationVehicle) => {
  const isOn = vehicle.ignition === 'Ligado';
  
  const element = document.createElement('div');
  element.className = 'marker-container';
  element.style.position = 'relative';
  element.style.width = '40px';
  element.style.height = '50px';
  element.style.cursor = 'pointer';
  
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('width', '40');
  svg.setAttribute('height', '50');
  svg.setAttribute('viewBox', '0 0 40 50');
  svg.style.position = 'absolute';
  svg.style.top = '0';
  svg.style.left = '0';
  
  const pinPath = document.createElementNS(svgNS, 'path');
  pinPath.setAttribute('d', 'M20 0C9 0 0 9 0 20c0 13.4 20 30 20 30s20-16.6 20-30C40 9 31 0 20 0z');
  pinPath.setAttribute('fill', isOn ? '#4CAF50' : '#F44336');
  pinPath.setAttribute('stroke', '#FFF');
  pinPath.setAttribute('stroke-width', '2');
  
  const circle = document.createElementNS(svgNS, 'circle');
  circle.setAttribute('cx', '20');
  circle.setAttribute('cy', '19');
  circle.setAttribute('r', '10');
  circle.setAttribute('fill', '#FFFFFF');
  
  const icon = document.createElementNS(svgNS, 'path');
  icon.setAttribute('d', 'M26 17H25V16C25 15.45 24.55 15 24 15H16C15.45 15 15 15.45 15 16V17H14C13.45 17 13 17.45 13 18V23C13 23.55 13.45 24 14 24H15C15 25.1 15.9 26 17 26C18.1 26 19 25.1 19 24H21C21 25.1 21.9 26 23 26C24.1 26 25 25.1 25 24H26C26.55 24 27 23.55 27 23V18C27 17.45 26.55 17 26 17ZM17 25C16.45 25 16 24.55 16 24C16 23.45 16.45 23 17 23C17.55 23 18 23.45 18 24C18 24.55 17.55 25 17 25ZM23 25C22.45 25 22 24.55 22 24C22 23.45 22.45 23 23 23C23.55 23 24 23.45 24 24C24 24.55 23.55 25 23 25ZM24 17H16V16H24V17Z');
  icon.setAttribute('fill', isOn ? '#4CAF50' : '#F44336');
  
  svg.appendChild(pinPath);
  svg.appendChild(circle);
  svg.appendChild(icon);
  
  element.appendChild(svg);
  
  const plateLabel = document.createElement('div');
  plateLabel.style.position = 'absolute';
  plateLabel.style.width = '48px';
  plateLabel.style.top = '50px';
  plateLabel.style.left = '-4px';
  plateLabel.style.textAlign = 'center';
  plateLabel.style.color = '#FFFFFF';
  plateLabel.style.fontWeight = 'bold';
  plateLabel.style.fontSize = '9px';
  plateLabel.style.textShadow = '1px 1px 2px rgba(0,0,0,0.8)';
  plateLabel.style.background = isOn ? 'rgba(76, 175, 80, 0.7)' : 'rgba(244, 67, 54, 0.7)';
  plateLabel.style.borderRadius = '3px';
  plateLabel.style.padding = '2px';
  plateLabel.textContent = vehicle.plate;
  
  element.appendChild(plateLabel);
  
  return element;
}; 