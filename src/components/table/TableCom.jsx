import TableSkeleton from "./TableSk";
function TableCom({ isLoading,tbody,thead,Arrycolumns,gridColumns}) {
//  totalpages : number of all pages in Api 
//  isLoading : wait upload api data
// tbody : return all data in api <td>{}</td> 
// thead :return <td></td> of columns name
// Arraycoluns : just array of names colums , and we use here beacuse  exapmle : grid-cold-[Arraycolumns.length]
// gridColumns : style grid pass props  
return (
    <table className="bg-surface-card  md:w-full h-auto px-8 ">
      <thead>
        <tr style={{gridTemplateColumns:gridColumns}} className={`*:text-xs  grid cursor-pointer  gap-8 *:p-2    px-8  bg-surface-card   border-t border-border-subtle *:text-text-muted`}>
         {thead}
        </tr>
      </thead>
      {isLoading  ? (<TableSkeleton columns={Arrycolumns.length} gridColumns={gridColumns} />) :
      <tbody className="*:hover:bg-surface-elevated *:cursor-pointer *:text-text-muted">
      {tbody}
      </tbody>
      }
      <tfoot className="border-t border-border-subtle ">
      </tfoot>
    </table>
  );
}
export default TableCom;

