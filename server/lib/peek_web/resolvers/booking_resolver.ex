defmodule PeekWeb.Resolvers.BookingResolver do
  require Logger
  alias Peek.Bookings

  def bookings(_, _, _) do
    {:ok, Bookings.all_bookings()}
  end

  def get_bookings(_, _, _) do
    {:ok, Bookings.get_bookings(1)}
  end

  def create_booking(_, args, _) do
    Logger.info  args.event_id
    {:ok, Bookings.create_booking(args.event_id, %{:first_name => args.first_name, :last_name => args.last_name})}
  end
end
