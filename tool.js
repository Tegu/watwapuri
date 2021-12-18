window.addEventListener('load', function () {
  var to_sorter = document.getElementById('to-sorter');
  var from_sorter = document.getElementById('from-sorter');
  to_sorter.style.display = 'inline';
  to_sorter.disabled = false;
  from_sorter.style.display = 'none';
  from_sorter.disabled = true;

  to_sorter.addEventListener('click', function () {
    var entry_area = document.getElementById('entries');
    var lines = entry_area.value
      .trim()
      .split('\n')
      //.map(function (s) {return s.trim()})
      //.filter(function (s) {return s.length > 0});

    var entries = lines.map(function (line, index) {
      var match = line.match(/^((\d+)(\. ))?(.*)$/);
      var rank = index + 1;
      if (match[2] !== undefined) {
        rank = parseInt(match[2]);
      }
      return [
        rank,
        index + 1,
        match[4],
      ];
    });

    entries.sort(function (entry1, entry2) {
      if (entry1[0] < entry2[0]) {
        return -1;
      }
      else if (entry1[0] > entry2[0]) {
        return 1;
      }
      return 0;
    });

    var list = document.createElement('ol');
    list.id = 'sorter';
    entries.forEach(function (entry) {
      var item = document.createElement('li');
      item.innerHTML = entry[2];
      item.setAttribute('original', entry[1]);

      list.appendChild(item);
    });

    var container = document.getElementById('sorter-container');
    container.innerHTML = '';
    container.appendChild(list);

    var sortable = Sortable.create(list);

    to_sorter.disabled = true;
    to_sorter.style.display = 'none';
    from_sorter.disabled = false;
    from_sorter.style.display = 'inline';
    entry_area.disabled = true;
  });

  from_sorter.addEventListener('click', function() {
    var sorter = document.getElementById('sorter');
    var item_elements = sorter.getElementsByTagName('li');

    var entries = Array.prototype.map.call(item_elements, function (item, index) {
      return [
        parseInt(item.getAttribute('original')),
        index + 1,
        item.innerText,
      ];
    });

    entries.sort(function (entry1, entry2) {
      if (entry1[0] < entry2[0]) {
        return -1;
      }
      else if (entry1[0] > entry2[0]) {
        return 1;
      }
      return 0;
    });

    var output = entries.map(function (entry) {
      return entry[1] + '. ' + entry[2];
    }).join('\n');

    var entry_area = document.getElementById('entries');
    entry_area.value = output;

    to_sorter.disabled = false;
    to_sorter.style.display = 'inline';
    from_sorter.disabled = true;
    from_sorter.style.display = 'none';
    var container = document.getElementById('sorter-container');
    container.innerHTML = '';
    var entry_area = document.getElementById('entries');
    entry_area.disabled = false;
  });
});
