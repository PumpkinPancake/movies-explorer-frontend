export const displayDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
  
    const hoursText = hours > 0 ? `${hours}ч` : "";
    const minutesText = minutes > 0 ? `${minutes}м` : "";
  
    return `${hoursText} ${minutesText}`;
  };