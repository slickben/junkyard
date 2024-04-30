let Uuid = 0;

export default function UniqueID() {
  const getID = () => {
    Uuid++;
    let generate = Math.floor((Uuid + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    return generate + generate + "-" + generate;
  };

  return {
    getID,
  };
}
