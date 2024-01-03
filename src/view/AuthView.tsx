/* spabaseに接続していないとエラーになるため、コメントアウト */

// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// // import { BadgeCheckIcon } from "@heroicons/react/solid";
// import {
//   Box,
//   Button,
//   Container,
//   FormControl,
//   FormErrorMessage,
//   FormLabel,
//   Input,
// } from "@chakra-ui/react";
// // import { supabase } from "../utils/supabase";
// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";

// export interface formInputs {
//   email: string;
//   password: string;
// }

// const schema = z.object({
//   email: z.string().email({ message: "Invalid email address" }),
//   password: z
//     .string()
//     .min(5, { message: "at least 5 characters" })
//     .refine((pw) => /[0-9]/.test(pw), "Password must contain a number"),
// });

// export default function Auth() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<formInputs>({
//     resolver: zodResolver(schema),
//   });
//   const navigate = useNavigate();
//   const { pathname } = useLocation();
//   const validateSession = async () => {
//     const {
//       data: { session },
//     } = await supabase.auth.getSession();
//     if (session !== null && pathname === "/") {
//       console.log(session);
//       navigate("/barcode");
//     } else {
//       navigate("/");
//     }
//   };
//   supabase.auth.onAuthStateChange((event, _) => {
//     if (event === "SIGNED_IN" && pathname === "/") {
//       navigate("/barcode");
//     }
//     if (event === "SIGNED_OUT") {
//       navigate("/");
//     }
//   });
//   useEffect(() => {
//     validateSession();
//   }, []);

//   const [isLogin, setIsLogin] = useState(true);

//   const onSubmit = async (data: formInputs) => {
//     const { email, password } = data;
//     try {
//       if (isLogin) {
//         const { error } = await supabase.auth.signInWithPassword({
//           email: email,
//           password: password,
//         });
//         if (error) {
//           throw new Error(error.message);
//         }
//         navigate("/barcode");
//       } else {
//         const { data, error } = await supabase.auth.signUp({
//           email: email,
//           password: password,
//         });
//         if (error) {
//           throw new Error(error.message);
//         }
//         data.user?.identities?.length === 0
//           ? navigate("/")
//           : navigate("/barcode");
//       }
//     } catch (error) {
//       alert("エラーが発生しました");
//     }
//   };

//   return (
//     <>
//       <Container
//         h="600px"
//         justifyContent="center"
//         display="flex"
//         alignItems="center"
//       >
//         <title>新規登録画面</title>
//         <link rel="icon" href="/favicon.ico" />
//         <form style={{ width: "350px" }} onSubmit={handleSubmit(onSubmit)}>
//           <Box>
//             <FormControl isInvalid={Boolean(errors.email)}>
//               <FormLabel>メールアドレス</FormLabel>
//               <Input type="email" required {...register("email")} />
//               <FormErrorMessage>
//                 {errors.email && errors.email.message}
//               </FormErrorMessage>
//             </FormControl>
//           </Box>
//           <Box mt="20px">
//             <FormControl isInvalid={Boolean(errors.password)}>
//               <FormLabel>
//                 パスワード
//                 <span style={{ fontSize: "12px" }}>(英数字5文字以上)</span>
//               </FormLabel>
//               <Input type="password" required {...register("password")} />
//               <FormErrorMessage>
//                 {errors.password && errors.password.message}
//               </FormErrorMessage>
//             </FormControl>
//           </Box>
//           <Container
//             display="flex"
//             alignItems="baseline"
//             my="30px"
//             ml="25px"
//             width="350px"
//           >
//             <Button
//               style={{ cursor: "pointer", marginRight: "50px" }}
//               onClick={() => setIsLogin(!isLogin)}
//             >
//               change mode ?
//             </Button>
//             <Button type="submit">{isLogin ? "Login" : "Register"}</Button>
//             {/* <span>
//               <BadgeCheckIcon className="h-1 w-1" />
//             </span> */}
//           </Container>
//         </form>
//       </Container>
//     </>
//   );
// }
