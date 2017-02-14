// Datatables init
$('table#incoming-operations').DataTable({});
$('table#ongoing-operations').DataTable({});
$('table#faded-operations').DataTable({});

// Datepickers
var ROUNDING = 15 * 60 * 1000;
nowRounded = moment.utc();
nowRounded = moment.utc(Math.ceil((+nowRounded) / ROUNDING) * ROUNDING);

var options = {
	timePicker: true,
	timePickerIncrement: 15,
	timePicker24Hour: true,
	minDate: moment.utc(),
	startDate: nowRounded,
	locale: {
		"format": "MM/DD/YYYY HH:mm"
	}
};

options.singleDatePicker = true;
$('#time_start').daterangepicker(options);
options.singleDatePicker = false;
$('#time_start_end').daterangepicker(options);

$("input[name=known_duration]:radio").change(function () {
	$('.datepicker').toggleClass("hidden");
});

// AJAX Add Operation form
$('#formCreateOperation').submit(function(e) {
	e.preventDefault();

	console.log($(this).serializeArray());

	$.ajax({
		type: "POST",
		url: "operation",
		data: $(this).serializeArray(),
		headers: {
			'X-CSRF-TOKEN' : $('meta[name="csrf-token"]').attr('content')
		},
		success: function (response) {
			$(location).attr('href', 'operation');
		},
		error: function (response) {
			$('.form-group').removeClass('has-error');
			$("#modal-errors ul").empty();
			$("#modal-errors").removeClass('hidden');
			$.each(response['responseJSON'], function (index, value) {
				$('[name="' + index + '"]').closest('div.form-group').addClass('has-error');
				$("#modal-errors ul").append('<li>' + value + '</li>');
			});
		}
	});
});