<template>
  <div class="login-container" @click="hideImage">
    <h1>Easy Word</h1>
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label>帐 号:</label>
        <input v-model="username" type="text" required class="form-input">
      </div>
      <div class="form-group">
        <label>密 码:</label>
        <input v-model="password" type="password" required class="form-input">
      </div>
	  <div class="contact-admin">
	          <span @click.stop="toggleImage">没有帐号？点击我，扫码联系</span>
	          <img
	            v-if="showImage"
	            class="admin-image"
	            src="/static/images/admin-wechat.png"
	            alt="管理员微信二维码"
	          />
	 </div>
      <button type="submit" class="login-button">登录</button>
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { users } from '@/config/auth'

export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
	  showImage: false, // 控制图片显示状态
    }
  },
  methods: {
	toggleImage() {
	        this.showImage = !this.showImage; // 切换图片显示状态
	      },
	hideImage() {
		this.showImage = false;
		},
   async handleLogin() {
	   try {
		  const user = users.find(u => u.username === this.username)
		  if (!user) {
			this.error = '帐号不存在! \n 请点击上方蓝色链接“扫码联系”'
			return
		  }
		  if (user.password !== this.password) {
			this.error = '密码错误! \n 请请点击上方蓝色链接“扫码联系”'
			return
		  }

		  // 添加认证状态存储
		  localStorage.setItem('isAuthenticated', 'true')

		  this.$router.push('/practice')
		  } catch (error) {
				console.error('登录跳转失败:', error)
				this.error = '登录失败，请重试'
				localStorage.removeItem('isAuthenticated')
		}
    }
  }
}
</script>

<style scoped>

	.contact-admin {
	  margin-top: 10px;
	  position: relative;
	  cursor: pointer;
	}

	.contact-admin span {
	  color: blue;
	  text-decoration: underline;
	}

	.admin-image {
	  position: absolute;
	  top: 0;
	  left: 150px; /* 根据需要调整图片位置 */
	  width: 150px; /* 图片宽度 */
	  height: auto; /* 保持图片比例 */
	  border: 1px solid #ccc;
	  border-radius: 5px;
	}

	.contact-admin .clickable {
	  color: #007bff;
	  cursor: pointer;
	  text-decoration: underline;
	}

	.image-popup {
	  position: fixed;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  background: rgba(0, 0, 0, 0.5);
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}

	.image-popup img {
	  max-width: 90%;
	  max-height: 90%;
	  border-radius: 8px;
	}
.login-container {
  /* 新增字体设置 */
  font-size: 16px;
  position: relative;
}

h1 {
  font-size: 24px;  /* 增大标题字体 */
  margin-bottom: 30px;
  text-align: center;
}

label {
  min-width: 80px;     /* 设置标签固定宽度 */
  margin-right: 10px;  /* 标签和输入框间距 */
  font-size: 18px;
  font-weight: 500;
}

.form-input {
  flex: 1;            /* 输入框占据剩余空间 */
  font-size: 18px;
  padding: 12px;
}

.login-button {
  font-size: 18px;  /* 增大按钮字体 */
  font-weight: 500; /* 加粗 */
}

.error-message {
  font-size: 16px;  /* 增大错误信息字体 */
}
.test-text {
  color: red;
  font-size: 20px;
  margin: 20px 0;
}

.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.login-form {
  margin-top: 20px;
}

.form-group {
  display: flex;        /* 使用flex布局 */
  align-items: center; /* 垂直居中 */
  margin-bottom: 20px;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.login-button {
  width: 100%;
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #3aa876;
}

.error-message {
  color: #ff4d4f;
  margin-top: 15px;
  text-align: center;
}
</style>
