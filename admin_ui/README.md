# Admin UI Problem Statement
<ol>
    <li> 
        Column titles must stand out from the entries.
    </li>
     <li> 
        There should be a search bar that can filter on any property.
    </li>
     <li> 
        You should be able to edit or delete rows in place.(There is no expectation of persistence. Edit and delete are expected to only happen in memory.)
    </li>
     <li> 
        You need to implement pagination: Each page contains 10 rows. Buttons at the bottom allow you to jump to any page including special buttons for first page, previous page, next page and last page. Pagination must update based on search/filtering. If there are 25 records for example that match a search query, then pagination buttons should only go till 3.
    </li>
     <li> 
        You should be able to select one or more rows. A selected row is highlighted with a grayish background color. Multiple selected rows can be deleted at once using the 'Delete Selected' button at the bottom left.
    </li>
     <li> 
       Checkbox on the top left is a shortcut to select or deselect all displayed rows. This should only apply to the ten rows displayed in the current page, and not all 50 rows.
    </li>
</ol> 

<hr/>

## Technology Stack Used
<ul>
    <li>HTML</li>
    <li>CSS (Bootstrap)</li>
    <li>JavaScript</li>
    <li>React JS</li>
</ul>  

## Screenshots
<img src="Screenshot.png" alt="Screenshot" /> 

## Installing dependencies  
### `npm start`
 
## Running tests (watch mode)
### `npm test`
 
## Running service (watch mode) 
### `npm run dev`
 
