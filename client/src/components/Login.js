
const Login=()=>{
    return(
        /*grid start*/
    <div class="grid grid-cols-2 divide-x">
       { /* grid child_1 start*/}
        <div class="min-h-screen bg-blue-500 bg-opacity-100 bg-gradient-to-tr from-blue-grd to-green-grd "></div>
        { /* grid child_1 end*/}
        { /* grid child_2 start*/}
        <div class="min-h-screen bg-white text-pink-800 antialiased px-2 py-4 flex flex-col justify-center sm:py-1">
        <h2 class="my-8 font-display font-medium text-4xl text-pink-700 text-center">
            Login
        </h2>    
        {/* flex start*/}
        <div class="flex items-center mb-5">
            <label for="name" class="inline-block w-20 mr-6 text-center font-bold text-gray-600"></label>
            <input type="email" id="email" name="email" placeholder="Enter your email-id" 
                   class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400  text-gray-600 placeholder-zinc-400 outline-none"/>
        </div>
        <div class="flex items-center mb-10">
            <label for="password" class="inline-block w-20 mr-6 text-right
                                        font-bold text-gray-600"></label>
            <input type="password" id="password" name="password" placeholder="Enter your password" id="pass" name="password"
            minlength="8" required class="flex-1 py-2 border-b-2 border-gray-400  focus:border-green-400 
                          text-gray-600
                          placeholder-zinc-400 outline-none"/> 
        </div>

        <div class="text-center">
            <button class="py-3 px-14 rounded-full bg-black-btn text-white font-bold">Login</button> 
        </div>
        {/* <!--<div>
            <h2 class="my-40 font-display font-thin text-1xl text-pink-700 ">Don't have an account?</h2> <a href="#" class="self-end mt-4 text-gray-600 font-bold"
            >Register</a>
  
        </div>--> */}
        <br/>
        <br></br>
        <br></br>
        <div class="flex items-center mb-44">
            <label for="account" class="inline-block w-25 mr-6 text-center font-medium text-gray-600 ">Don't have an account?</label>
            <a href="#" class="self-end mr-6 text-pink-600 font-bold">Register</a>
        </div>
        <div class="flex items-center mb-24">
            <a href="#" class="self-end mb-9 text-pink-600 font-semibold">Forgot Username?</a><a href="#" class="self-end mb-9 text-pink-600 font-semibold">Forgot Password?</a>
        </div>
        </div>
        { /* grid child_2 end*/}
    </div>
    )
}



export default Login;