var jReminder = $('#reminderbox').clone().css('display', 'block').addClass('reminderbox');
			if(jReminder.length)
			{
				jReminder
					.dialog({ autoOpen: false, modal: true, width: 800, closeOnEscape: true})
					.window('close')
					.dialog('open')
					.delegate('.viewreminder', 'click', function(){
						$(this).closest('tr').remove();
						if(jReminder.find('a.viewreminder').length == 0)
						{
							jReminder.window('close');
						}
				});
			}