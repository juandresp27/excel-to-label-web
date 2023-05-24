import { useContext, useState, useEffect } from "react";
import { PositionContext } from "../Positions";

export function Table({ JsonInput, Position }) {
  const [headers, setHeaders] = useState([]);
  const {selectedRow, setSelectedRow, filters, setFilters} = useContext(PositionContext) // New state for selected row

  useEffect(() => {
    JsonInput.length !== 0
      ? setHeaders(Object.keys(JsonInput[Position]))
      : setHeaders([]);
  }, [JsonInput]);

  const handleClickTable = (index) => {
    setSelectedRow(index); // Set the selected row index
  };

  return (
    <div className="flex flex-col m-auto" style={{ height: "60vh", width: "90%" }}>
      <div className="flex-grow no-scrollbar overflow-auto">
        <table className="table-auto border-collapse relative w-full text-sm">
          <thead>
            <tr>
              {headers.length !== 0 ? (
                headers.map((header, index) => (
                  <th
                    key={index}
                    className="sticky top-0 p-2 pl-3 pt-3 pb-3 text-left text-[#fff] bg-[#5d43ac] border-b border-[#301c6a67]"
                  >
                    <input
                      onChange={(e) => {
                        const updatedFilters = [...filters];
                        updatedFilters[index] = e.target.value;
                        setFilters(updatedFilters);
                      }}
                      placeholder={`${header}`}
                      className="w-20 bg-[#dcdcff] text-zinc-800 rounded-[0.2rem]"
                    />
                  </th>
                ))
              ) : (
                <></>
              )}
            </tr>
          </thead>
          <tbody className="bg-transparent text-[#301c6a]">
          {JsonInput.filter((item) => {
            let includeItem = true;
            filters.forEach((filter, index) => {
              if (filter !== '') {
                const value = Object.values(item)[index]
                  .toString()
                  .toLowerCase();
                if (!value.includes(filter.toLowerCase())) {
                  includeItem = false;
                }
              }
            });
            return includeItem;
          }).map((item, index) => (
              <tr
                key={index}
                onClick={() => handleClickTable(index)}
                className={`hover:bg-[#c8b6ff9f] cursor-pointer ${
                  selectedRow === index ? "bg-[#bba4ffb7]" : "" // Add the conditional background color
                }`}
              >
                {Object.values(item).map((val, index) => (
                  <td
                    key={index}
                    className="border-b border-[#301c6a67] p-2 pl-3 text-[#301c6a]"
                  >
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}