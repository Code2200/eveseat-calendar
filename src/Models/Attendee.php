<?php

namespace Kassie\Seat\Calendar\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Seat\Web\Models\User;
use \DateTime;

class Attendee extends Model
{
	protected $table = 'calendar_attendees';

	protected $fillable = [
		'user_id',
		'operation_id',
		'status',
		'comment'
	];

	public function user() {
		return $this->belongsTo(User::class);
	}

}