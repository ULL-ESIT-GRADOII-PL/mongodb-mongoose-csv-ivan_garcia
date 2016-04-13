// See http://en.wikipedia.org/wiki/Comma-separated_values
(() => {
"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

const resultTemplate = `
<div class="contenido">
      <table class="center" id="result">
          <% _.each(rows, (row) => { %>
          <tr class="<%=row.type%>">
              <% _.each(row.items, (name) =>{ %>
              <td><%= name %></td>
              <% }); %>
          </tr>
          <% }); %>
      </table>
  </p>
</div>
`;

/* Volcar la tabla con el resultado en el HTML */
const fillTable = (data) => {
  $("#finaltable").html(_.template(resultTemplate, { rows: data.rows }));
};

/* Volcar en la textarea de entrada
 * #original el contenido del fichero fileName */
const dump = (fileName) => {
  $.get(fileName, function (data) {
      $("#original").val(data);
  });
};

const handleFileSelect = (evt) => {

}

/* Drag and drop: el fichero arrastrado se vuelca en la textarea de entrada */
const handleDragFileSelect = (evt) => {

}

const handleDragOver = (evt) => {

}

$(document).ready(() => {
    let original = document.getElementById("original");
    if (window.localStorage && localStorage.original) {
      original.value = localStorage.original;
    }

    /* Request AJAX para que se calcule la tabla */
    $("#parser").click( () => {
        if (window.localStorage) localStorage.original = original.value;
        $.get("/csv", /* Request AJAX para que se calcule la tabla */
          { input: original.value },
          fillTable,
          'json'
        );
   });
   /* botones para rellenar el textarea */


    // Setup the drag and drop listeners.
    //var dropZone = document.getElementsByClassName('drop_zone')[0];


})();
