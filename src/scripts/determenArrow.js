export const whichArrow = (winddegree) => {
  if (winddegree >= 0 & winddegree <= 23) {
    return ('↑');
  }

  if (winddegree >= 24 & winddegree <= 68) {
    return ('↗');
  }

  if (winddegree >= 24 & winddegree <= 68) {
    return ('↗');
  }

  if (winddegree >= 24 & winddegree <= 68) {
    return ('↗');
  }

  if (winddegree >= 69 & winddegree <= 113) {
    return ('→');
  }

  if (winddegree >= 114 & winddegree <= 158) {
    return ('↘');
  }

  if (winddegree >= 159 & winddegree <= 203) {
    return ('↓');
  }

  if (winddegree >= 204 & winddegree <= 248) {
    return ('↙');
  }

  if (winddegree >= 249 & winddegree <= 293) {
    return ('←');
  }

  if (winddegree >= 294 & winddegree <= 360) {
    return ('↑');
  }

  return 'Unknown';
};

export const showKmorMp = (km) => {
  if (km) {
    document.querySelector('.windarrowmph').style.display = 'none';
    document.querySelector('.windarrow').style.display = 'block';
  } else {
    document.querySelector('.windarrowmph').style.display = 'block';
    document.querySelector('.windarrow').style.display = 'none';
  }
};

export const showTemp = (celcius) => {
  if (celcius) {
    document.querySelector('.tempF').style.display = 'none';
    document.querySelector('.temp').style.display = 'block';
  } else {
    document.querySelector('.tempF').style.display = 'block';
    document.querySelector('.temp').style.display = 'none';
  }
};
// export default whichArrow;
