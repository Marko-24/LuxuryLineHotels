import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomeHolidayInn from "./components/hotels/HolidayInn/layout/HomeHolidayInn.jsx";
import LandingPage from './components/admin/LandingPage.jsx';
import SuperAdminProfile from './components/admin/SuperAdminProfile.jsx';
import CheckoutHolidayInn from './components/hotels/HolidayInn/bookings/CheckoutHolidayInn.jsx';
import Login from "./components/auth/Login.jsx";
import Registration from "./components/auth/Registration.jsx";
import {AuthProvider} from "./components/auth/AuthProvider.jsx";
import RequireAuth from "./components/auth/RequireAuth.jsx";
import BookingSuccessHolidayInn from "./components/hotels/HolidayInn/bookings/BookingSuccessHolidayInn.jsx";
import LoginHolidayInn from "./components/hotels/HolidayInn/account/LoginHolidayInn.jsx";
import ProfileHolidayInn from "./components/hotels/HolidayInn/account/ProfileHolidayInn.jsx";
import RegistrationHolidayInn from "./components/hotels/HolidayInn/account/RegistrationHolidayInn.jsx";
import AddRoomHolidayInn from "./components/hotels/HolidayInn/rooms/AddRoomHolidayInn.jsx";
import EditRoomHolidayInn from "./components/hotels/HolidayInn/rooms/EditRoomHolidayInn.jsx";
import RoomHolidayInn from "./components/hotels/HolidayInn/rooms/RoomHolidayInn.jsx";
import AddRoomAdmin from "./components/admin/AddRoomAdmin.jsx";
import EditRoomAdmin from "./components/admin/EditRoomAdmin.jsx";
import HomeMarriott from "./components/hotels/Marriott/layout/HomeMarriott.jsx";
import RegistrationMarriott from "./components/hotels/Marriott/account/RegistrationMarriott.jsx";
import LoginMarriott from "./components/hotels/Marriott/account/LoginMarriott.jsx";
import ProfileMarriott from "./components/hotels/Marriott/account/ProfileMarriott.jsx";
import RoomMarriott from "./components/hotels/Marriott/rooms/RoomMarriott.jsx";
import AddRoomMarriott from "./components/hotels/Marriott/rooms/AddRoomMarriott.jsx";
import EditRoomMarriott from "./components/hotels/Marriott/rooms/EditRoomMarriott.jsx";
import CheckoutMarriott from "./components/hotels/Marriott/bookings/CheckoutMarriott.jsx";
import BookingSuccessMarriott from "./components/hotels/Marriott/bookings/BookingSuccessMarriott.jsx";
import BookingSuccessHilton from "./components/hotels/Hilton/bookings/BookingSuccessHilton.jsx";
import CheckoutHilton from "./components/hotels/Hilton/bookings/CheckoutHilton.jsx";
import EditRoomHilton from "./components/hotels/Hilton/rooms/EditRoomHilton.jsx";
import AddRoomHilton from "./components/hotels/Hilton/rooms/AddRoomHilton.jsx";
import RoomHilton from "./components/hotels/Hilton/rooms/RoomHilton.jsx";
import ProfileHilton from "./components/hotels/Hilton/account/ProfileHilton.jsx";
import LoginHilton from "./components/hotels/Hilton/account/LoginHilton.jsx";
import RegistrationHilton from "./components/hotels/Hilton/account/RegistrationHilton.jsx";
import HomeHilton from "./components/hotels/Hilton/layout/HomeHilton.jsx";
import HomeLimak from "./components/hotels/Limak/layout/HomeLimak.jsx";
import RegistrationLimak from "./components/hotels/Limak/account/RegistrationLimak.jsx";
import LoginLimak from "./components/hotels/Limak/account/LoginLimak.jsx";
import ProfileLimak from "./components/hotels/Limak/account/ProfileLimak.jsx";
import RoomLimak from "./components/hotels/Limak/rooms/RoomLimak.jsx";
import AddRoomLimak from "./components/hotels/Limak/rooms/AddRoomLimak.jsx";
import EditRoomLimak from "./components/hotels/Limak/rooms/EditRoomLimak.jsx";
import CheckoutLimak from "./components/hotels/Limak/bookings/CheckoutLimak.jsx";
import BookingSuccessLimak from "./components/hotels/Limak/bookings/BookingSuccessLimak.jsx";
import HomePanoramika from "./components/hotels/Panoramika/layout/HomePanoramika.jsx";
import RegistrationPanoramika from "./components/hotels/Panoramika/account/RegistrationPanoramika.jsx";
import LoginPanoramika from "./components/hotels/Panoramika/account/LoginPanoramika.jsx";
import ProfilePanoramika from "./components/hotels/Panoramika/account/ProfilePanoramika.jsx";
import RoomPanoramika from "./components/hotels/Panoramika/rooms/RoomPanoramika.jsx";
import AddRoomPanoramika from "./components/hotels/Panoramika/rooms/AddRoomPanoramika.jsx";
import EditRoomPanoramika from "./components/hotels/Panoramika/rooms/EditRoomPanoramika.jsx";
import CheckoutPanoramika from "./components/hotels/Panoramika/bookings/CheckoutPanoramika.jsx";
import BookingSuccessPanoramika from "./components/hotels/Panoramika/bookings/BookingSuccessPanoramika.jsx";

function App() {
  return (
    <AuthProvider>
    <main>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/hotel-hilton' element={<HomeHilton/>}/>
          <Route path='/hotel-holiday-inn' element={<HomeHolidayInn/>}/>
          <Route path='/hotel-marriott' element={<HomeMarriott/>}/>
          <Route path='/hotel-limak' element={<HomeLimak/>}/>
          <Route path='/hotel-panoramika' element={<HomePanoramika/>}/>

          <Route path="/register" element={<Registration/>}/>
          <Route path="/register-hilton" element={<RegistrationHilton/>}/>
          <Route path="/register-holiday-inn" element={<RegistrationHolidayInn/>}/>
          <Route path="/register-marriott" element={<RegistrationMarriott/>}/>
          <Route path="/register-limak" element={<RegistrationLimak/>}/>
          <Route path="/register-panoramika" element={<RegistrationPanoramika/>}/>

          <Route path="/login" element={<Login/>}/>
          <Route path="/login-hilton" element={<LoginHilton/>}/>
          <Route path="/login-holiday-inn" element={<LoginHolidayInn/>}/>
          <Route path="/login-marriott" element={<LoginMarriott/>}/>
          <Route path="/login-limak" element={<LoginLimak/>}/>
          <Route path="/login-panoramika" element={<LoginPanoramika/>}/>

          <Route path="/profile" element={<SuperAdminProfile/>}/>
          <Route path="/profile-hilton" element={<ProfileHilton/>}/>
          <Route path="/profile-holiday-inn" element={<ProfileHolidayInn/>}/>
          <Route path="/profile-marriott" element={<ProfileMarriott/>}/>
          <Route path="/profile-limak" element={<ProfileLimak/>}/>
          <Route path="/profile-panoramika" element={<ProfilePanoramika/>}/>

          <Route path='/browse-rooms-hilton' element={<RoomHilton/>}/>
          <Route path='/browse-rooms-holiday-inn' element={<RoomHolidayInn/>}/>
          <Route path='/browse-rooms-marriott' element={<RoomMarriott/>}/>
          <Route path='/browse-rooms-limak' element={<RoomLimak/>}/>
          <Route path='/browse-rooms-panoramika' element={<RoomPanoramika/>}/>

          <Route path='/add-room/admin' element={<AddRoomAdmin/>}/>
          <Route path='/add-room/hilton' element={<AddRoomHilton/>}/>
          <Route path='/add-room/holiday-inn' element={<AddRoomHolidayInn/>}/>
          <Route path='/add-room/marriott' element={<AddRoomMarriott/>}/>
          <Route path='/add-room/limak' element={<AddRoomLimak/>}/>
          <Route path='/add-room/panoramika' element={<AddRoomPanoramika/>}/>

          <Route path='/edit-room/:roomId/admin' element={<EditRoomAdmin/>}/>
          <Route path='/edit-room/:roomId/hilton' element={<EditRoomHilton/>}/>
          <Route path='/edit-room/:roomId/holiday-inn' element={<EditRoomHolidayInn/>}/>
          <Route path='/edit-room/:roomId/marriott' element={<EditRoomMarriott/>}/>
          <Route path='/edit-room/:roomId/limak' element={<EditRoomLimak/>}/>
          <Route path='/edit-room/:roomId/panoramika' element={<EditRoomPanoramika/>}/>

          <Route path="/book-room/:roomId/hilton" element={<RequireAuth><CheckoutHilton/></RequireAuth>}/>
          <Route path="/book-room/:roomId/holiday-inn" element={<RequireAuth><CheckoutHolidayInn/></RequireAuth>}/>
          <Route path="/book-room/:roomId/marriott" element={<RequireAuth><CheckoutMarriott/></RequireAuth>}/>
          <Route path="/book-room/:roomId/limak" element={<RequireAuth><CheckoutLimak/></RequireAuth>}/>
          <Route path="/book-room/:roomId/panoramika" element={<RequireAuth><CheckoutPanoramika/></RequireAuth>}/>

          <Route path='/booking-success-hilton' element={<BookingSuccessHilton/>}/>
          <Route path='/booking-success-holiday-inn' element={<BookingSuccessHolidayInn/>}/>
          <Route path='/booking-success-marriott' element={<BookingSuccessMarriott/>}/>
          <Route path='/booking-success-limak' element={<BookingSuccessLimak/>}/>
          <Route path='/booking-success-panoramika' element={<BookingSuccessPanoramika/>}/>
        </Routes>
      </Router>
    </main>
    </AuthProvider>
  );
}

export default App;